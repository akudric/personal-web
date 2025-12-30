import { revalidatePath } from "next/cache";
import AdminActionButton from "./AdminActionButton";
import { createProject } from "../actions";

export default function NewProjectForm() {
  return (
    <div>
      <form
        className="mt-5 grid gap-4 md:grid-cols-12"
        action={async (fd) => {
          "use server";
          await createProject(fd);
          revalidatePath("/admin");
        }}
      >
        <div className="md:col-span-6">
          <label className="text-sm font-medium text-slate-700">Project name</label>
          <input
            name="name"
            required
            placeholder="e.g. Code Flow Demo Project"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-3">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            name="status"
            defaultValue="on_track"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="on_track">on_track</option>
            <option value="needs_input">needs_input</option>
            <option value="blocked">blocked</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="text-sm font-medium text-slate-700">Phase</label>
          <select
            name="phase"
            defaultValue="discovery"
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

        <div className="md:col-span-3">
          <label className="text-sm font-medium text-slate-700">Progress</label>
          <input
            name="progress"
            type="number"
            min={0}
            max={100}
            defaultValue={0}
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-5">
          <label className="text-sm font-medium text-slate-700">
            Client Clerk User ID (optional)
          </label>
          <input
            name="client_clerk_user_id"
            placeholder="e.g. user_2abcXYZ..."
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">
            If provided, the client will immediately see this project on their dashboard.
          </p>
        </div>

        <div className="md:col-span-4">
          <label className="text-sm font-medium text-slate-700">Target launch date (optional)</label>
          <input
            name="target_launch_date"
            type="date"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-12">
          <label className="text-sm font-medium text-slate-700">Description (optional)</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Short scope summary..."
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-3">
          <AdminActionButton variant="primary" className="w-full">
            Create project
          </AdminActionButton>
        </div>
      </form>
    </div>
  );
}
