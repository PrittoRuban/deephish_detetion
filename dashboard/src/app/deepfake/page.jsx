import { DeepfakeAnalysisGrids } from "@/components/deepfake/DeepDash";
import { DeepfakeEducationSection } from "@/components/deepfake/DeepEdu";

export default function Deepfake() {
  return (
    <div className="flex flex-col items-center px-4">
      <DeepfakeAnalysisGrids />
      <DeepfakeEducationSection />
    </div>
  );
}