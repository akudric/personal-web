// app/components/WorkScope.tsx
import Link from "next/link";

type Tier = {
  name: string;
  tagline: string;
  bestFor: string;
  includes: string[];
  examples: string[];
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter Site",
    tagline: "A clean, professional website to get you online",
    bestFor: "Small businesses that need a simple, trustworthy online presence.",
    includes: [
      "1–5 pages (Home, Services, About, Contact)",
      "Mobile-friendly design",
      "Contact forms & basic SEO",
      "Fast loading and modern look",
    ],
    examples: ["Local services", "Freelancers", "Small shops"],
  },
  {
    name: "Business Site",
    tagline: "A larger website that explains your business clearly",
    bestFor: "Businesses with multiple services, locations, or detailed content.",
    includes: [
      "5–15 pages",
      "Clear structure and navigation",
      "Lead forms (quotes, bookings, inquiries)",
      "Easy content updates",
    ],
    examples: ["Agencies", "Clinics", "Construction companies"],
  },
  {
    name: "Client Portal",
    tagline: "A website where users can log in and interact",
    bestFor: "Businesses that need user accounts or private content.",
    includes: [
      "User login & accounts",
      "Admin and user roles",
      "Personal dashboards (profile, data, history)",
      "Secure database setup",
    ],
    examples: ["Customer areas", "Booking portals", "Internal tools"],
    highlight: true,
  },
  {
    name: "Business App",
    tagline: "A custom app that helps run your business",
    bestFor: "Companies that want to automate processes and save time.",
    includes: [
      "Custom workflows (statuses, approvals)",
      "Dashboards, tables, and search",
      "Email notifications",
      "Third-party integrations",
    ],
    examples: ["Scheduling systems", "Order tracking", "Process management"],
  },
  {
    name: "Online Store",
    tagline: "Sell products or services online",
    bestFor: "Businesses that want to sell online or offer subscriptions.",
    includes: [
      "Products, categories, and checkout",
      "Payments and order management",
      "Admin panel for products & orders",
      "Scalable and secure setup",
    ],
    examples: ["Webshops", "Digital products", "Membership sites"],
  },
];

function CheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
      ✓
    </span>
  );
}

export default function WorkScope() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-slate-600">What we offer</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Solutions that match your business stage
        </h2>
        <p className="mt-3 text-slate-600">
          Whether you need a simple website or a custom application, we help you
          choose the right solution—no unnecessary complexity.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={[
              "relative rounded-2xl border bg-white p-6 shadow-sm",
              tier.highlight
                ? "border-slate-900"
                : "border-slate-200 hover:border-slate-300",
            ].join(" ")}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-6 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                Most chosen
              </div>
            )}

            <h3 className="text-xl font-semibold text-slate-900">
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{tier.tagline}</p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-700">Best for</p>
              <p className="mt-1 text-sm text-slate-700">{tier.bestFor}</p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-700">What’s included</p>
              <ul className="mt-3 space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-xs font-medium text-slate-700">Examples</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tier.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/contact"
                className={[
                  "inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
                  tier.highlight
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
                ].join(" ")}
              >
                Ask about {tier.name}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-700">
          Not sure which option fits you best? We’ll help you choose the right
          solution based on your goals, budget, and timeline.
        </p>
      </div>
    </section>
  );
}