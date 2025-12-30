// app/dashboard/page.tsx
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserProjects } from "./getProjects";

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

export default async function DashboardLandingPage() {
  const user = await currentUser();
  if (!user) return null;

  const projects = await getUserProjects(user.id);

  // 0 projects
  if (projects.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">This account isn’t linked to any projects yet.</p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-900">Need access?</p>
          <p className="mt-2 text-sm text-slate-600">
            Contact Code Flow and we’ll link your account to your project.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Contact Code Flow
          </Link>
        </div>
      </main>
    );
  }

  // 1 project → go straight to it
  if (projects.length === 1) {
    redirect(`/dashboard/projects/${projects[0].id}`);
  }

  // 2+ projects → chooser
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Choose a project</h1>
      <p className="mt-2 text-slate-600">Select which project you want to view.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="px-5 py-3">Project</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Phase</th>
              <th className="px-5 py-3">Progress</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-slate-200">
                <td className="px-5 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-5 py-3">{p.phase}</td>
                <td className="px-5 py-3">{p.progress}%</td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/dashboard/projects/${p.id}`}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 hover:bg-slate-50"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
