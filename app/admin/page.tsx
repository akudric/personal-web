import Link from "next/link";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import NewProjectPanel from "./components/NewProjectPanel";
import NewProjectForm from "./components/NewProjectForm";

export default async function AdminProjectsPage() {
  const { data: projects, error } = await supabaseAdmin
    .from("projects")
    .select("id, name, status, phase, progress, updated_at")
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Developer Panel</h1>
      <p className="mt-2 text-slate-600">Manage projects, tasks, milestones and updates.</p>

      <div className="mt-8">
        <NewProjectPanel>
          <NewProjectForm />
        </NewProjectPanel>
      </div>

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
            {projects?.map((p) => (
              <tr key={p.id} className="border-t border-slate-200">
                <td className="px-5 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-5 py-3">{p.status}</td>
                <td className="px-5 py-3">{p.phase}</td>
                <td className="px-5 py-3">{p.progress}%</td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 hover:bg-slate-50"
                  >
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
            {projects?.length === 0 ? (
              <tr>
                <td className="px-5 py-6 text-slate-600" colSpan={5}>
                  No projects yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}