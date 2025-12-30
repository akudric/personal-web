"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { clerkClient } from "@clerk/nextjs/server";

export async function updateProject(formData: FormData) {
  const projectId = String(formData.get("projectId"));
  const status = String(formData.get("status"));
  const phase = String(formData.get("phase"));
  const progress = Number(formData.get("progress"));

  const { error } = await supabaseAdmin
    .from("projects")
    .update({
      status,
      phase,
      progress,
      last_update_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) throw error;
}

export async function setTaskDone(formData: FormData) {
  const taskId = String(formData.get("taskId"));
  const done = String(formData.get("done")) === "true";

  const { error } = await supabaseAdmin
    .from("tasks")
    .update({
      status: done ? "done" : "todo",
      completed_at: done ? new Date().toISOString() : null,
    })
    .eq("id", taskId);

  if (error) throw error;
}

export async function addTask(formData: FormData) {
  const projectId = String(formData.get("projectId"));
  const title = String(formData.get("title"));
  const owner = String(formData.get("owner")); // client|codeflow
  const priority = String(formData.get("priority")); // low|normal|high
  const status = String(formData.get("status")); // todo|in_progress|blocked|done
  const due_date_raw = String(formData.get("due_date") || "");
  const due_date = due_date_raw ? due_date_raw : null;

  const { error } = await supabaseAdmin.from("tasks").insert({
    project_id: projectId,
    title,
    owner,
    priority,
    status,
    due_date,
  });

  if (error) throw error;

  await supabaseAdmin
    .from("projects")
    .update({ last_update_at: new Date().toISOString() })
    .eq("id", projectId);
}

export async function deleteTask(formData: FormData) {
  const taskId = String(formData.get("taskId"));

  const { error } = await supabaseAdmin.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
}

export async function setMilestoneComplete(formData: FormData) {
  const milestoneId = String(formData.get("milestoneId"));
  const done = String(formData.get("done")) === "true";

  const { error } = await supabaseAdmin
    .from("milestones")
    .update({
      completed_at: done ? new Date().toISOString() : null,
    })
    .eq("id", milestoneId);

  if (error) throw error;
}

export async function addProjectUpdate(formData: FormData) {
  const projectId = String(formData.get("projectId"));
  const title = String(formData.get("title") || "");
  const body = String(formData.get("body"));
  const visibility = String(formData.get("visibility") || "client"); // client|internal

  const { error } = await supabaseAdmin.from("project_updates").insert({
    project_id: projectId,
    title: title || null,
    body,
    visibility,
  });

  if (error) throw error;

  await supabaseAdmin
    .from("projects")
    .update({ last_update_at: new Date().toISOString() })
    .eq("id", projectId);
}
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createProject(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Project name is required");

  const status = String(formData.get("status") || "on_track");
  const phase = String(formData.get("phase") || "discovery");
  const progress = Number(formData.get("progress") || 0);
  const descriptionRaw = String(formData.get("description") || "").trim();
  const description = descriptionRaw ? descriptionRaw : null;
  const targetLaunchDateRaw = String(formData.get("target_launch_date") || "").trim();
  const target_launch_date = targetLaunchDateRaw ? targetLaunchDateRaw : null;

  const clientClerkUserIdRaw = String(formData.get("client_clerk_user_id") || "").trim();
  const client_clerk_user_id = clientClerkUserIdRaw ? clientClerkUserIdRaw : null;

  // Generate a slug and ensure uniqueness by appending a short suffix if needed
  const baseSlug = slugify(name) || "project";
  let slug = baseSlug;

  // Try insert; if slug conflict, retry with suffix
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data: inserted, error } = await supabaseAdmin
      .from("projects")
      .insert({
        name,
        slug,
        status,
        phase,
        progress: Math.max(0, Math.min(100, progress)),
        description,
        target_launch_date,
        last_update_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (!error && inserted?.id) {
      // Optionally link the client user to the project
      if (client_clerk_user_id) {
        const { error: memberErr } = await supabaseAdmin.from("project_members").insert({
          project_id: inserted.id,
          clerk_user_id: client_clerk_user_id,
          role: "client",
          is_primary_contact: true,
        });

        if (memberErr) {
          // If membership insert fails, still keep project created
          // (You can surface this later if you want)
          console.warn("Failed to create project member:", memberErr.message);
        }
      }

      revalidatePath("/admin");
      return;
    }

    // If slug conflict, retry with suffix
    const msg = (error as any)?.message ?? "";
    const code = (error as any)?.code ?? "";
    const isUniqueViolation = code === "23505" || msg.toLowerCase().includes("duplicate");

    if (isUniqueViolation) {
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
      continue;
    }

    throw error;
  }

  throw new Error("Failed to create project (slug conflicts). Try a different name.");
}
export async function addProjectMember(formData: FormData) {
  const projectId = String(formData.get("projectId"));
  const userIdentifier = String(formData.get("user_identifier") || "").trim();
  const role = String(formData.get("role") || "client");
  const isPrimary = String(formData.get("is_primary_contact") || "false") === "true";

  if (!userIdentifier) throw new Error("Email or user id is required");

  let clerkUserId = userIdentifier;

  // If not an id, treat as email and resolve via Clerk
  if (!userIdentifier.startsWith("user_")) {
    const email = userIdentifier.toLowerCase();

    const client = await clerkClient();

    // Clerk supports searching users; we only need the first exact match
    const res = await client.users.getUserList({ emailAddress: [email], limit: 1 });

    const found = res.data?.[0];
    if (!found?.id) {
      throw new Error(`No Clerk user found for email: ${email}`);
    }

    clerkUserId = found.id;
  }

  // If making primary, unset others
  if (isPrimary) {
    const { error: unsetErr } = await supabaseAdmin
      .from("project_members")
      .update({ is_primary_contact: false })
      .eq("project_id", projectId);

    if (unsetErr) throw unsetErr;
  }

  const { error } = await supabaseAdmin.from("project_members").insert({
    project_id: projectId,
    clerk_user_id: clerkUserId,
    role,
    is_primary_contact: isPrimary,
  });

  if (error) throw error;
}


export async function removeProjectMember(formData: FormData) {
  const memberId = String(formData.get("memberId"));

  const { error } = await supabaseAdmin
    .from("project_members")
    .delete()
    .eq("id", memberId);

  if (error) throw error;
}

export async function setPrimaryContact(formData: FormData) {
  const projectId = String(formData.get("projectId"));
  const memberId = String(formData.get("memberId"));

  // unset others
  const { error: unsetErr } = await supabaseAdmin
    .from("project_members")
    .update({ is_primary_contact: false })
    .eq("project_id", projectId);

  if (unsetErr) throw unsetErr;

  // set selected
  const { error } = await supabaseAdmin
    .from("project_members")
    .update({ is_primary_contact: true })
    .eq("id", memberId);

  if (error) throw error;
}