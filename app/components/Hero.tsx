import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 h-72 w-[36rem] rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Digital solutions for small businesses
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Digital Solutions That Help{" "}
              <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Small Businesses Grow
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Websites, apps, and custom desktop tools built to save you time,
              automate work, and turn visitors into customers—without the tech
              headaches.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Get a Free Consultation
              </Link>

              <Link
                href="#work"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                View Our Work
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Fast turnaround
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Clear pricing
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Ongoing support
              </div>
            </div>
          </div>

          {/* Visual */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">Client Dashboard</p>
                      <p className="text-xs text-slate-500">Example project view</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>
                  </div>

                  {/* Project header */}
                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-500">Project</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          Code Flow Website + Portal
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Phase: <span className="font-medium text-slate-900">Development</span>
                        </p>
                      </div>

                      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        On track
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">Overall progress</p>
                        <p className="text-xs font-medium text-slate-900">62%</p>
                      </div>
                      <div className="mt-2 h-2 w-full rounded bg-white">
                        <div className="h-2 w-[62%] rounded bg-slate-900" />
                      </div>
                    </div>
                  </div>

                  {/* Two columns */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {/* Next actions */}
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">Next actions</p>

                      <ul className="mt-3 space-y-2">
                        {[
                          { label: "Send logo + brand colors", done: false },
                          { label: "Approve homepage copy", done: true },
                          { label: "Review staging link", done: false },
                        ].map((t) => (
                          <li key={t.label} className="flex items-start gap-2">
                            <span
                              className={[
                                "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px]",
                                t.done
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border-slate-300 bg-white text-slate-600",
                              ].join(" ")}
                            >
                              {t.done ? "✓" : "•"}
                            </span>
                            <span
                              className={[
                                "text-xs",
                                t.done ? "text-slate-500 line-through" : "text-slate-700",
                              ].join(" ")}
                            >
                              {t.label}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600">
                        Weekly updates included
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs font-medium text-slate-500">Milestones</p>

                      <ul className="mt-3 space-y-2">
                        {[
                          { label: "Discovery", done: true },
                          { label: "Design", done: true },
                          { label: "Development", done: false },
                          { label: "Launch", done: false },
                        ].map((m) => (
                          <li key={m.label} className="flex items-center gap-2">
                            <span
                              className={[
                                "inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px]",
                                m.done
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-600",
                              ].join(" ")}
                            >
                              {m.done ? "✓" : "•"}
                            </span>
                            <span className="text-xs text-slate-700">{m.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Updates (full width) */}
                    <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Updates</p>
                        <span className="text-[11px] text-slate-500">Today</span>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <p className="text-[11px] font-medium text-slate-500">
                            Status update
                          </p>
                          <p className="mt-1 text-xs text-slate-700">
                            Staging is live — please review and send feedback.
                          </p>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-[11px] font-medium text-slate-500">
                            Next step
                          </p>
                          <p className="mt-1 text-xs text-slate-700">
                            We’ll finalize pages after your approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative ring */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-slate-200/70" />
            </div>
        </div>
      </div>
    </section>
  );
}