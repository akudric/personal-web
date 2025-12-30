// app/dashboard/getDashboardData.ts
import "server-only";
import { supabaseAdmin } from "../lib/supabaseAdmin";

export async function getDashboardData(clerkUserId: string) {
  // 1) Find project IDs the user belongs to
  const { data: memberships, error: membersError } = await supabaseAdmin
    .from("project_members")
    .select("project_id")
    .eq("clerk_user_id", clerkUserId);

  if (membersError) throw membersError;

  const projectIds = (memberships ?? []).map((m) => m.project_id);
  if (projectIds.length === 0) {
    return { project: null};
  }

  // 2) Fetch the most recently updated project (or pick the first)
  const { data: projectList, error: projectError } = await supabaseAdmin
    .from("projects")
    .select("id, name, status, phase, progress, last_update_at, updated_at")
    .in("id", projectIds)
    .order("updated_at", { ascending: false });

  if (projectError) throw projectError;

  const project = projectList?.[0];
  if (!project) return { project: null};

  // 3) Fetch child data in parallel
  const [tasksRes, milestonesRes, updatesRes, linksRes, filesRes] =
    await Promise.all([
      supabaseAdmin
        .from("tasks")
        .select("id, title, status, priority, owner, due_date, completed_at")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("milestones")
        .select("id, title, sort_order, due_date, completed_at")
        .eq("project_id", project.id)
        .order("sort_order", { ascending: true }),

      supabaseAdmin
        .from("project_updates")
        .select("id, title, body, visibility, created_at")
        .eq("project_id", project.id)
        .eq("visibility", "client")
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("project_links")
        .select("id, label, url, category, is_pinned, created_at")
        .eq("project_id", project.id)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("files")
        .select(
          "id, file_name, mime_type, size_bytes, storage_path, created_at, note"
        )
        .eq("project_id", project.id)
        .order("created_at", { ascending: false }),
    ]);

  if (tasksRes.error) throw tasksRes.error;
  if (milestonesRes.error) throw milestonesRes.error;
  if (updatesRes.error) throw updatesRes.error;
  if (linksRes.error) throw linksRes.error;
  if (filesRes.error) throw filesRes.error;

  return {
    project,
    tasks: tasksRes.data ?? [],
    milestones: milestonesRes.data ?? [],
    updates: updatesRes.data ?? [],
    links: linksRes.data ?? [],
    files: filesRes.data ?? [],
  };
}