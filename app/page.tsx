import Hero from "./components/Hero";
import WorkScope from "./components/WorkScope";
import HowItWorks from "./components/HowItWorks";
import ContactSection from "./components/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WorkScope />
      <HowItWorks />
      <ContactSection />
    </main>
  );
}