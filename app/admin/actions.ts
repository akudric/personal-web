"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../lib/supabaseAdmin";

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