import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import AdminShell from "../../components/AdminShell";
import ProjectStatusForm from "../../components/ProjectStatusForm";
import TasksManager from "../../components/TaskManager";
import MilestonesManager from "../../components/MileStonesManager";
import UpdatesManager from "../../components/UpdatesManager";
import ProjectMembersManager from "../../components/ProjectMembersManager";
import { clerkClient } from "@clerk/nextjs/server";


export default async function AdminProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = await params;

  const [{ data: project }, { data: tasks }, { data: milestones }, { data: updates }, { data: members }] =
    await Promise.all([
      supabaseAdmin
        .from("projects")
        .select("id, name, status, phase, progress")
        .eq("id", projectId)
        .single(),

      supabaseAdmin
        .from("tasks")
        .select("id, title, status, owner, due_date, completed_at")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("milestones")
        .select("id, title, sort_order, completed_at")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true }),

      supabaseAdmin
        .from("project_updates")
        .select("id, title, body, visibility, created_at")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false }),
      supabaseAdmin
      .from("project_members")
      .select("id, clerk_user_id, role, is_primary_contact, created_at")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true }),
      ]);
  const rawMembers = members ?? [];
  const client = await clerkClient();

  const uniqueIds = Array.from(new Set(rawMembers.map((m) => m.clerk_user_id)));

  const userResults = await Promise.all(
    uniqueIds.map(async (id) => {
      try {
        const u = await client.users.getUser(id);

        const email =
          u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress ??
          u.emailAddresses[0]?.emailAddress ??
          null;

        const name =
          (u.firstName || u.lastName)
            ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
            : (u.username ?? email ?? id);

        return {
          clerk_user_id: id,
          display_name: name,
          email,
          image_url: u.imageUrl ?? null,
        };
      } catch {
        // user not found / no permission / etc.
        return {
          clerk_user_id: id,
          display_name: null,
          email: null,
          image_url: null,
        };
      }
    })
  );

  const userMap = new Map(userResults.map((u) => [u.clerk_user_id, u]));

  const enrichedMembers = rawMembers.map((m) => {
    const profile = userMap.get(m.clerk_user_id);
    return {
      ...m,
      display_name: profile?.display_name ?? null,
      email: profile?.email ?? null,
      image_url: profile?.image_url ?? null,
    };
  });
  if (!project) {
    return (
      <AdminShell title="Project not found" subtitle="This project does not exist.">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
          Check the URL or return to the admin list.
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={project.name} subtitle="Update project status, tasks, milestones and client updates.">
      <ProjectStatusForm
        projectId={project.id}
        status={project.status}
        phase={project.phase}
        progress={project.progress}
      />

      <div className="mt-8">
        <ProjectMembersManager projectId={project.id} members={enrichedMembers} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <TasksManager projectId={project.id} tasks={tasks ?? []} />
        <MilestonesManager projectId={project.id} milestones={milestones ?? []} />
      </div>

      <div className="mt-8">
        <UpdatesManager projectId={project.id} updates={updates ?? []} />
      </div>
    </AdminShell>
  );
  
}