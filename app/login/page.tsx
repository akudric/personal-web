import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-md">
        <SignIn />
      </div>
    </main>
  );
}