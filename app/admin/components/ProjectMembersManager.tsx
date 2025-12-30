import { revalidatePath } from "next/cache";
import AdminActionButton from "./AdminActionButton";
import {
  addProjectMember,
  removeProjectMember,
  setPrimaryContact,
} from "../projects/[id]/actions";

type Member = {
  id: string;
  clerk_user_id: string;
  role: "client" | "codeflow_admin" | "codeflow_member";
  is_primary_contact: boolean;
  created_at: string;

  // Enriched fields (from Clerk)
  display_name?: string | null;
  email?: string | null;
  image_url?: string | null;
};

export default function ProjectMembersManager({
  projectId,
  members,
}: {
  projectId: string;
  members: Member[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">Project members</p>
        <span className="text-xs text-slate-500">{members.length} total</span>
      </div>

      {/* Add member */}
      <form
        className="mt-4 grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-12"
        action={async (fd) => {
          "use server";
          await addProjectMember(fd);
          revalidatePath(`/admin/projects/${projectId}`);
          revalidatePath(`/dashboard`);
        }}
      >
        <input type="hidden" name="projectId" value={projectId} />

        <div className="md:col-span-6">
          <label className="text-xs font-medium text-slate-600">Email or Clerk User ID</label>
            <input
                name="user_identifier"
                required
                placeholder="email@example.com or user_2abcXYZ..."
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-slate-500">
                Paste a client email or a Clerk user id.
            </p>
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-medium text-slate-600">Role</label>
          <select
            name="role"
            defaultValue="client"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="client">client</option>
            <option value="codeflow_member">codeflow_member</option>
            <option value="codeflow_admin">codeflow_admin</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="text-xs font-medium text-slate-600">Primary contact</label>
          <select
            name="is_primary_contact"
            defaultValue="false"
            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <AdminActionButton variant="primary" className="w-full">
            Add member
          </AdminActionButton>
        </div>
      </form>

      {/* Member list */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Primary</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {members.map((m) => (
              <tr key={m.id} className="border-b border-slate-200 last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {m.image_url ? (
                        <img src={m.image_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-500">
                          {m.display_name?.slice(0, 1)?.toUpperCase() ?? "?"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {m.display_name || "Unknown user"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {m.email || m.clerk_user_id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">{m.role}</td>

                <td className="px-4 py-3">
                  {m.is_primary_contact ? (
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      Primary
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">—</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {!m.is_primary_contact ? (
                      <form
                        action={async (fd) => {
                          "use server";
                          await setPrimaryContact(fd);
                          revalidatePath(`/admin/projects/${projectId}`);
                          revalidatePath(`/dashboard`);
                        }}
                      >
                        <input type="hidden" name="projectId" value={projectId} />
                        <input type="hidden" name="memberId" value={m.id} />
                        <AdminActionButton>Make primary</AdminActionButton>
                      </form>
                    ) : null}

                    <form
                      action={async (fd) => {
                        "use server";
                        await removeProjectMember(fd);
                        revalidatePath(`/admin/projects/${projectId}`);
                        revalidatePath(`/dashboard`);
                      }}
                    >
                      <input type="hidden" name="memberId" value={m.id} />
                      <AdminActionButton variant="danger">Remove</AdminActionButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {members.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-600" colSpan={4}>
                  No members linked yet. Add the client Clerk user ID above.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
