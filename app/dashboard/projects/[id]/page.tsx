// app/dashboard/projects/[id]/page.tsx
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "on_track"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "needs_input"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : status === "blocked"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  const label =
    status === "on_track"
      ? "On track"
      : status === "needs_input"
      ? "Needs input"
      : status === "blocked"
      ? "Blocked"
      : "Completed";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

export default async function ProjectDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  if (!user) return null;

  const { id: projectId } = await params;

  // ✅ membership check: user must be member of this project
  const { data: membership } = await supabaseAdmin
    .from("project_members")
    .select("id")
    .eq("project_id", projectId)
    .eq("clerk_user_id", user.id)
    .maybeSingle();

  if (!membership) {
    redirect("/dashboard");
  }

  // Fetch project + child data
  const [{ data: project }, tasksRes, milestonesRes, updatesRes, linksRes, filesRes] =
    await Promise.all([
      supabaseAdmin
        .from("projects")
        .select("id, name, status, phase, progress, last_update_at, updated_at")
        .eq("id", projectId)
        .single(),

      supabaseAdmin
        .from("tasks")
        .select("id, title, status, priority, owner, due_date, completed_at")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("milestones")
        .select("id, title, sort_order, due_date, completed_at")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true }),

      supabaseAdmin
        .from("project_updates")
        .select("id, title, body, visibility, created_at")
        .eq("project_id", projectId)
        .eq("visibility", "client")
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("project_links")
        .select("id, label, url, category, is_pinned, created_at")
        .eq("project_id", projectId)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("files")
        .select("id, file_name, mime_type, size_bytes, storage_path, created_at, note")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false }),
    ]);

  if (!project) redirect("/dashboard");

  const tasks = tasksRes.data ?? [];
  const milestones = milestonesRes.data ?? [];
  const updates = updatesRes.data ?? [];
  const links = linksRes.data ?? [];
  const files = filesRes.data ?? [];

  const orderRank: Record<string, number> = { todo: 1, in_progress: 2, blocked: 3, done: 4 };
  const sortedTasks = [...tasks].sort((a, b) => {
    const ra = orderRank[a.status] ?? 99;
    const rb = orderRank[b.status] ?? 99;
    if (ra !== rb) return ra - rb;
    const da = a.due_date ? new Date(a.due_date).getTime() : Number.POSITIVE_INFINITY;
    const db = b.due_date ? new Date(b.due_date).getTime() : Number.POSITIVE_INFINITY;
    return da - db;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
            ← All projects
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">{project.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="text-sm text-slate-600">
              Phase: <span className="font-medium text-slate-900">{project.phase}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            Contact Code Flow
          </Link>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Overall progress</p>
          <p className="text-sm font-medium text-slate-900">{project.progress}%</p>
        </div>
        <div className="mt-3 h-2 w-full rounded bg-slate-100">
          <div className="h-2 rounded bg-slate-900" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Tasks */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold text-slate-900">Next actions</p>
          <ul className="mt-4 space-y-3">
            {sortedTasks.slice(0, 6).map((t) => (
              <li key={t.id} className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <span
                    className={[
                      "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border",
                      t.status === "done"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-white text-slate-600 border-slate-300",
                    ].join(" ")}
                  >
                    {t.status === "done" ? "✓" : "•"}
                  </span>

                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Owner: {t.owner} {t.due_date ? `• Due: ${t.due_date}` : ""}
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                  {t.status.replace("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Milestones */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Milestones</p>
          <ul className="mt-4 space-y-2">
            {milestones.map((m) => (
              <li key={m.id} className="flex items-center gap-2 text-sm">
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full",
                    m.completed_at ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
                  ].join(" ")}
                >
                  {m.completed_at ? "✓" : "•"}
                </span>
                <span className={m.completed_at ? "text-slate-700" : "text-slate-600"}>{m.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Links */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Project links</p>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.id}>
                <a className="text-sm text-slate-700 hover:text-slate-900 hover:underline" href={l.url} target="_blank">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Updates */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold text-slate-900">Updates</p>
          <div className="mt-4 space-y-4">
            {updates.map((u) => (
              <div key={u.id} className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500">
                  {new Date(u.created_at).toLocaleDateString()}
                </p>
                {u.title ? <p className="mt-1 text-sm font-medium text-slate-900">{u.title}</p> : null}
                <p className="mt-2 text-sm text-slate-700">{u.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Files */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
          <p className="text-sm font-semibold text-slate-900">Files</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="py-2">File</th>
                  <th className="py-2">Uploaded</th>
                  <th className="py-2">Size</th>
                  <th className="py-2">Note</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {files.map((f) => (
                  <tr key={f.id} className="border-t border-slate-200">
                    <td className="py-3 font-medium text-slate-900">{f.file_name}</td>
                    <td className="py-3">{new Date(f.created_at).toLocaleDateString()}</td>
                    <td className="py-3">{f.size_bytes ? `${Math.round(f.size_bytes / 1024)} KB` : "-"}</td>
                    <td className="py-3">{f.note ?? "-"}</td>
                  </tr>
                ))}
                {files.length === 0 ? (
                  <tr className="border-t border-slate-200">
                    <td className="py-3 text-slate-600" colSpan={4}>
                      No files uploaded yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
