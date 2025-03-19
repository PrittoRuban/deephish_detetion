import { PhishDash } from "@/components/PhishDash";
import { PhishingEducationSection } from "@/components/PhishEdu";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4">
      <PhishDash />
      <PhishingEducationSection />
    </div>
  );
}
