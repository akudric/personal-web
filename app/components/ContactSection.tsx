"use client";

import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: Info */}
        <div>
          <p className="text-sm font-medium text-slate-600">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Let’s talk about your project
          </h2>
          <p className="mt-3 max-w-xl text-slate-600">
            Tell us what you’re building and we’ll reply with the next steps,
            timeline, and a clear estimate. No pressure, no jargon.
          </p>

          <div className="mt-8 space-y-4">
            {/* Email */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Email</p>
              <Link
                href="mailto:info@codeflow.hr"
                className="mt-1 block text-sm font-medium text-slate-900 hover:underline"
              >
                info@codeflow.hr
              </Link>
              <p className="mt-1 text-sm text-slate-600">
                Best for detailed questions & proposals.
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Phone</p>
              <Link
                href="tel:+385000000000"
                className="mt-1 block text-sm font-medium text-slate-900 hover:underline"
              >
                +385 00 000 0000
              </Link>
              <p className="mt-1 text-sm text-slate-600">
                Mon–Fri, 09:00–17:00 (CET).
              </p>
            </div>

            {/* Location (optional) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Location</p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                Croatia (remote-friendly)
              </p>
              <p className="mt-1 text-sm text-slate-600">
                We work with clients across Croatia and the EU.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-900">
              Prefer a quick call?
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Send a short message and we’ll suggest a time.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Send us a message
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Fill out the form and we’ll get back to you soon.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              // Logic will be implemented later
              e.preventDefault();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-slate-700"
                >
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+385..."
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-slate-700"
                >
                  What do you need?
                </label>
                <select
                  id="service"
                  name="service"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  defaultValue="Website"
                >
                  <option>Website</option>
                  <option>Web App</option>
                  <option>Online Store</option>
                  <option>Desktop App</option>
                  <option>Maintenance / Support</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="text-sm font-medium text-slate-700"
              >
                Budget range (optional)
              </label>
              <select
                id="budget"
                name="budget"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                defaultValue="Not sure"
              >
                <option>Not sure</option>
                <option>€500 – €1,500</option>
                <option>€1,500 – €5,000</option>
                <option>€5,000 – €15,000</option>
                <option>€15,000+</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-slate-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us briefly what you need, any deadlines, and links/examples if you have them."
                className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300"
              />
              <label htmlFor="privacy" className="text-sm text-slate-600">
                I agree that Code Flow may contact me about this request.
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Send message
            </button>

            <p className="text-xs text-slate-500">
              This form is currently UI-only. Submission logic will be added
              later.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}