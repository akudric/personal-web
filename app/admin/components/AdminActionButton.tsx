"use client";

import { useTransition } from "react";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

export default function AdminActionButton({
  children,
  variant = "secondary",
  className = "",
}: Props) {
  const [isPending, startTransition] = useTransition();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-400",
    secondary:
      "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300",
    danger:
      "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 focus:ring-rose-300",
  };

  return (
    <button
      disabled={isPending}
      onClick={(e) => {
        const form = (e.currentTarget as HTMLButtonElement).form;
        if (!form) return;
        startTransition(() => form.requestSubmit());
      }}
      className={[
        base,
        variants[variant],
        isPending
          ? "cursor-wait opacity-70"
          : "active:scale-[0.97]",
        className,
      ].join(" ")}
    >
      {isPending ? (
        <>
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Working…
        </>
      ) : (
        children
      )}
    </button>
  );
}