import { PhishDash } from "@/components/phishing/PhishDash";
import { PhishingEducationSection } from "@/components/phishing/PhishEdu";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4">
      <PhishDash />
      <PhishingEducationSection />
    </div>
  );
}
