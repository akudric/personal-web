import { revalidatePath } from "next/cache";
import { updateProject } from "../projects/[id]/actions";
import AdminActionButton from "./AdminActionButton";

export default function ProjectStatusForm({
  projectId,
  status,
  phase,
  progress,
}: {
  projectId: string;
  status: string;
  phase: string;
  progress: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Project status</p>

      <form
        className="mt-4 grid gap-4 md:grid-cols-4"
        action={async (fd) => {
          "use server";
          await updateProject(fd);
          revalidatePath(`/admin/projects/${projectId}`);
          revalidatePath(`/dashboard`);
        }}
      >
        <input type="hidden" name="projectId" value={projectId} />

        <div>
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            name="status"
            defaultValue={status}
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="on_track">on_track</option>
            <option value="needs_input">needs_input</option>
            <option value="blocked">blocked</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Phase</label>
          <select
            name="phase"
            defaultValue={phase}
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="discovery">discovery</option>
            <option value="design">design</option>
            <option value="development">development</option>
            <option value="testing">testing</option>
            <option value="launch">launch</option>
            <option value="maintenance">maintenance</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Progress (0–100)</label>
          <input
            name="progress"
            type="number"
            min={0}
            max={100}
            defaultValue={progress}
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-end">
          <AdminActionButton>
              Save
          </AdminActionButton>
        </div>
      </form>
    </div>
  );
}