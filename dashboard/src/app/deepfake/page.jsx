import { DeepfakeAnalysisGrids } from "@/components/DeepDash";
import { DeepfakeEducationSection } from "@/components/DeepEdu";

export default function Deepfake() {
  return (
    <div className="flex flex-col items-center px-4">
      <DeepfakeAnalysisGrids />
      <DeepfakeEducationSection />
    </div>
  );
}