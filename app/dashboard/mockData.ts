export const mockProject = {
  projectName: "Code Flow Website + Client Portal",
  status: "On track",
  phase: "Development",
  lastUpdate: "2025-12-28",
  progress: 62,
  nextActions: [
    { title: "Send business info + services text", owner: "Client", done: false },
    { title: "Approve homepage hero copy", owner: "Client", done: true },
    { title: "Finish dashboard UI", owner: "Code Flow", done: false },
  ],
  milestones: [
    { title: "Discovery", done: true },
    { title: "Design", done: true },
    { title: "Development", done: false },
    { title: "Testing", done: false },
    { title: "Launch", done: false },
  ],
  links: [
    { label: "Staging website", href: "https://staging.example.com" },
    { label: "Design (Figma)", href: "https://figma.com" },
    { label: "Project notes", href: "https://notion.so" },
  ],
  updates: [
    { date: "2025-12-28", text: "Hero + Work Scope sections implemented. Next: contact + footer polish." },
    { date: "2025-12-27", text: "Navigation updated with Clerk authentication and protected dashboard route." },
  ],
  invoices: [
    { number: "INV-001", amount: "€500", status: "Paid", date: "2025-12-10" },
    { number: "INV-002", amount: "€900", status: "Due", date: "2026-01-05" },
  ],
};