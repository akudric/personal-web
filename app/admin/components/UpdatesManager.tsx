import { revalidatePath } from "next/cache";
import { addProjectUpdate } from "../projects/[id]/actions";

type Update = {
  id: string;
  title: string | null;
  body: string;
  visibility: "client" | "internal";
  created_at: string;
};

export default function UpdatesManager({
  projectId,
  updates,
}: {
  projectId: string;
  updates: Update[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Post an update</p>

      <form
        className="mt-4 grid gap-4 md:grid-cols-5"
        action={async (fd) => {
          "use server";
          await addProjectUpdate(fd);
          revalidatePath(`/admin/projects/${projectId}`);
          revalidatePath(`/dashboard`);
        }}
      >
        <input type="hidden" name="projectId" value={projectId} />

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Title (optional)</label>
          <input
            name="title"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g. Staging is live"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Visibility</label>
          <select
            name="visibility"
            defaultValue="client"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="client">client</option>
            <option value="internal">internal</option>
          </select>
        </div>

        <div className="md:col-span-5">
          <label className="text-sm font-medium text-slate-700">Message</label>
          <textarea
            name="body"
            rows={4}
            required
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            placeholder="Write a short update for the client..."
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Post update
          </button>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-sm font-semibold text-slate-900">Recent updates</p>
        <div className="mt-4 space-y-3">
          {updates.slice(0, 6).map((u) => (
            <div key={u.id} className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">
                {new Date(u.created_at).toLocaleString()} • {u.visibility}
              </p>
              {u.title ? <p className="mt-1 text-sm font-medium text-slate-900">{u.title}</p> : null}
              <p className="mt-2 text-sm text-slate-700">{u.body}</p>
            </div>
          ))}
          {updates.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No updates yet.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
