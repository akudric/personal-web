export default function ProjectLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-64 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
          </div>
          <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-100" />
        </div>

        <div className="mt-8 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
          <div className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-50 lg:col-span-2" />
        </div>
      </div>
    </main>
  );
}
