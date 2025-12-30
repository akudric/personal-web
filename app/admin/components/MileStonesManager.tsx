import { revalidatePath } from "next/cache";
import { setMilestoneComplete } from "../projects/[id]/actions";
import AdminActionButton from "./AdminActionButton";

type Milestone = {
  id: string;
  title: string;
  completed_at: string | null;
};

export default function MilestonesManager({
  projectId,
  milestones,
}: {
  projectId: string;
  milestones: Milestone[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Milestones</p>

      <div className="mt-4 space-y-3">
        {milestones.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <span
                className={[
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs",
                  m.completed_at ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
                ].join(" ")}
              >
                {m.completed_at ? "✓" : "•"}
              </span>
              <p className="text-sm font-medium text-slate-900">{m.title}</p>
            </div>

            <form
              action={async (fd) => {
                "use server";
                await setMilestoneComplete(fd);
                revalidatePath(`/admin/projects/${projectId}`);
                revalidatePath(`/dashboard`);
              }}
            >
              <input type="hidden" name="milestoneId" value={m.id} />
              <input type="hidden" name="done" value={m.completed_at ? "false" : "true"} />
              <AdminActionButton>
                {m.completed_at ? "Uncomplete" : "Complete"}
              </AdminActionButton>
            </form>
          </div>
        ))}

        {milestones.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            No milestones yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}