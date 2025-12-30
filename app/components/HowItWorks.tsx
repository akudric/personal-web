"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type Step = {
  title: string;
  description: string;
  points: string[];
};

const steps: Step[] = [
  {
    title: "1) Quick call",
    description:
      "We learn what you need, what success looks like, and what timeline you’re aiming for.",
    points: ["Your goals & budget", "Examples you like", "What to build first"],
  },
  {
    title: "2) Clear plan",
    description:
      "We define scope, deliverables and the next steps — no confusing jargon.",
    points: ["Scope & timeline", "Fixed estimate or milestones", "What we need from you"],
  },
  {
    title: "3) Build & updates",
    description:
      "We build fast, share progress regularly, and keep decisions simple.",
    points: ["Weekly updates", "Staging link to review", "Small feedback cycles"],
  },
  {
    title: "4) Launch & support",
    description:
      "We go live smoothly and stay available for improvements and maintenance.",
    points: ["Deployment & handover", "Performance & SEO checks", "Support options"],
  },
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.01 : 0.35 } },
  };

  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="text-sm font-medium text-slate-600">How it works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            A simple process that keeps things moving
          </h2>
          <p className="mt-3 max-w-xl text-slate-600">
            Small businesses don’t need complexity — they need clarity. Here’s how Code Flow
            takes you from idea to launch with minimal stress.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Get a free consultation
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            See examples
          </Link>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 lg:grid-cols-2"
      >
        {steps.map((s) => (
          <motion.div
            key={s.title}
            variants={item}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>

              {/* subtle accent dot */}
              <div className="mt-1 h-3 w-3 rounded-full bg-slate-200 transition group-hover:bg-slate-900" />
            </div>

            <p className="mt-2 text-sm text-slate-600">{s.description}</p>

            <ul className="mt-5 space-y-2">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                    ✓
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* subtle bottom CTA card */}
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Not sure what you need yet?
            </p>
            <p className="mt-1 text-sm text-slate-600">
              We’ll recommend the simplest option that achieves your goal.
            </p>
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Ask a question
          </Link>
        </div>
      </motion.div>
    </section>
  );
}