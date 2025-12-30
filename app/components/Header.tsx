"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import AdminLink from "./AdminLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-900"
          >
            Code Flow
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#work" className="text-sm text-slate-700 hover:text-slate-900">
              Work
            </Link>
            <Link href="/#process" className="text-sm text-slate-700 hover:text-slate-900">
              How it works
            </Link>
            <Link href="/#contact" className="text-sm text-slate-700 hover:text-slate-900">
              Contact
            </Link>

            {/* Admin-only */}
            <SignedIn>
              <AdminLink />
            </SignedIn>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Signed out */}
            <SignedOut>
              <Link
                href="/login"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Sign in
              </Link>
            </SignedOut>

            {/* Signed in */}
            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
