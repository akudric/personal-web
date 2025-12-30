export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="relative mt-1 h-10 w-10">
            {/* subtle spinner */}
            <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-slate-900">
              Opening your dashboard…
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              We’re loading your project details.
            </p>

            {/* skeleton rows */}
            <div className="mt-6 space-y-3">
              <div className="h-4 w-[22rem] max-w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-[18rem] max-w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-[26rem] max-w-full animate-pulse rounded bg-slate-100" />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Redirecting…
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
