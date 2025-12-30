// app/admin/layout.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/login");

  const role = (user.publicMetadata as { role?: string } | undefined)?.role;
  if (role !== "admin") redirect("/dashboard");

  return <>{children}</>;
}