// app/dashboard/getProjects.ts
import "server-only";
import { supabaseAdmin } from "../lib/supabaseAdmin";

export type ProjectRow = {
  id: string;
  name: string;
  status: string;
  phase: string;
  progress: number;
  updated_at: string;
  last_update_at: string | null;
};

export async function getUserProjects(clerkUserId: string): Promise<ProjectRow[]> {
  const { data: memberships, error: membersError } = await supabaseAdmin
    .from("project_members")
    .select("project_id")
    .eq("clerk_user_id", clerkUserId);

  if (membersError) throw membersError;

  const projectIds = (memberships ?? []).map((m) => m.project_id);
  if (projectIds.length === 0) return [];

  const { data: projects, error: projectError } = await supabaseAdmin
    .from("projects")
    .select("id, name, status, phase, progress, updated_at, last_update_at")
    .in("id", projectIds)
    .order("updated_at", { ascending: false });

  if (projectError) throw projectError;

  return projects ?? [];
}
