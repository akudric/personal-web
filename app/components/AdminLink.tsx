"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function AdminLink() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;

  const isAdmin = (user?.publicMetadata as { role?: string } | undefined)?.role === "admin";
  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
    >
      Dev Panel
    </Link>
  );
}