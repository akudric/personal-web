import Link from "next/link";

export default function AdminShell({
  title,
  subtitle,
  backHref = "/admin",
  backLabel = "Back",
  children,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div>
        <Link href={backHref} className="text-sm text-slate-600 hover:text-slate-900">
          ← {backLabel}
        </Link>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-1 text-slate-600">{subtitle}</p> : null}
      </div>

      <div className="mt-8">{children}</div>
    </main>
  );
}
