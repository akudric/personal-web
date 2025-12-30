import { revalidatePath } from "next/cache";
import { addTask, deleteTask, setTaskDone } from "../projects/[id]/actions";
import AdminActionButton from "./AdminActionButton";

type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "blocked" | "done";
  owner: "client" | "codeflow";
  due_date: string | null;
};

export default function TasksManager({
  projectId,
  tasks,
}: {
  projectId: string;
  tasks: Task[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">Tasks</p>
        <span className="text-xs text-slate-500">{tasks.length} total</span>
      </div>

      {/* Add task */}
      <form
        className="mt-4 grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-6"
        action={async (fd) => {
          "use server";
          await addTask(fd);
          revalidatePath(`/admin/projects/${projectId}`);
          revalidatePath(`/dashboard`);
        }}
      >
        <input type="hidden" name="projectId" value={projectId} />

        <div className="md:col-span-3">
          <label className="text-xs font-medium text-slate-600">Title</label>
          <input
            name="title"
            required
            placeholder="e.g. Review staging link"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Owner</label>
          <select
            name="owner"
            defaultValue="codeflow"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="client">client</option>
            <option value="codeflow">codeflow</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Status</label>
          <select
            name="status"
            defaultValue="todo"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="todo">todo</option>
            <option value="in_progress">in_progress</option>
            <option value="blocked">blocked</option>
            <option value="done">done</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Priority</label>
          <select
            name="priority"
            defaultValue="normal"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-medium text-slate-600">Due date (optional)</label>
          <input
            name="due_date"
            type="date"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-4" />

        <div className="md:col-span-2">
          <AdminActionButton variant="primary">
            Add task
          </AdminActionButton>
        </div>
      </form>

      {/* Task list */}
      <div className="mt-4 space-y-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{t.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                owner: {t.owner} • status: {t.status}
                {t.due_date ? ` • due: ${t.due_date}` : ""}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              <form
                action={async (fd) => {
                  "use server";
                  await setTaskDone(fd);
                  revalidatePath(`/admin/projects/${projectId}`);
                  revalidatePath(`/dashboard`);
                }}
              >
                <input type="hidden" name="taskId" value={t.id} />
                <input type="hidden" name="done" value={t.status === "done" ? "false" : "true"} />
                <AdminActionButton>
                  {t.status === "done" ? "Mark not done" : "Mark done"}
                </AdminActionButton>
              </form>

              <form
                action={async (fd) => {
                  "use server";
                  await deleteTask(fd);
                  revalidatePath(`/admin/projects/${projectId}`);
                  revalidatePath(`/dashboard`);
                }}
              >
                <input type="hidden" name="taskId" value={t.id} />
                <AdminActionButton variant="danger">
                  Delete
                </AdminActionButton>
              </form>
            </div>
          </div>
        ))}

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No tasks yet. Add one above.
          </div>
        ) : null}
      </div>
    </div>
  );
}