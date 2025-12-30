"use client";

import { useState } from "react";

export default function NewProjectPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Projects</p>
          <p className="mt-1 text-sm text-slate-600">
            Create and manage client projects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={[
            "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150",
            open
              ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 active:scale-[0.98]"
              : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]",
          ].join(" ")}
        >
          {open ? "Close" : "Create new project"}
        </button>
      </div>

      {/* Animated panel (no extra libs) */}
      <div
        className={[
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}