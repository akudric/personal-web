"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              Code Flow
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Digital solutions for small businesses — websites, web apps, and custom tools
              built with clear communication and long-term support.
            </p>

            <div className="mt-4 space-y-1 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Email:</span>{" "}
                <a className="hover:underline" href="mailto:info@codeflow.hr">
                  info@codeflow.hr
                </a>
              </p>
              <p>
                <span className="font-medium text-slate-900">Phone:</span>{" "}
                <a className="hover:underline" href="tel:+385000000000">
                  +385 00 000 0000
                </a>
              </p>
            </div>
          </div>

          {/* Site */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Site</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/#work">
                  Work
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/#process">
                  How it works
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-slate-900" href="/#contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Client area */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Client area</p>
            <p className="mt-4 text-sm text-slate-600">
              Already working with us? View your project status and updates.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <SignedOut>
                <Link
                  href="/login"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Sign in
                </Link>
              </SignedOut>

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  Dashboard
                </Link>
              </SignedIn>

              <Link
                href="/#contact"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            © {year} Code Flow. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {/* Only keep links you actually have */}
            <Link className="text-slate-600 hover:text-slate-900" href="/#contact">
              Contact
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" href="/#work">
              Work
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" href="/#process">
              Process
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
