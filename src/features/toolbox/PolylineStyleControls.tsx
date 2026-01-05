import type { AnnotationPatch, PolylineAnnotation } from "../../types/intern/annotation";
import { ControlSlider } from "./BaseStyleControls";
import { Constants } from "../../utils/Constants";

interface PolylineStyleControlsProps {
    annotation: PolylineAnnotation;
    onChange: (patch: AnnotationPatch) => void;
}

const PolylineStyleControls = ({
                                   annotation,
                                   onChange,
                               }: PolylineStyleControlsProps) => {
    const strokeWidth = annotation.style.strokeWidth ?? 1;

    return (
        <div className="space-y-2 border-t border-neutral-700 pt-4">
            <ControlSlider
                label="Stroke width"
                min={1}
                max={Constants.MAX_STROKE_WIDTH}
                step={1}
                value={strokeWidth}
                onChange={(v) =>
                    onChange({
                        style: { strokeWidth: v },
                    })
                }
            />
        </div>
    );
};

export default PolylineStyleControls;
