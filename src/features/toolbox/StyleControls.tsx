import type {Annotation, AnnotationPatch} from "../../types/intern/annotation.ts";
import BaseStyleControls from "./BaseStyleControls.tsx";
import CustomTextControls from "./CustomTextControls.tsx";
import PolylineStyleControls from "./PolylineStyleControls.tsx";

interface StyleControlsProps {
    annotation: Annotation;
    onChange: (patch: AnnotationPatch) => void;
}

const StyleControls = ({ annotation, onChange }: StyleControlsProps) => {
    const isTextAnnotation = annotation.kind === 'text';
    const isPolylineAnnotation = annotation.kind === 'polyline';

    return (

        <div className="flex flex-col gap-5 p-3 border-t border-neutral-700">
            <BaseStyleControls
                annotation={annotation}
                onChange={(stylePatch) =>
                    onChange({ style: { ...annotation.style, ...stylePatch } })
                }
            />
            {isPolylineAnnotation && (
                <PolylineStyleControls
                    annotation={annotation}
                    onChange={onChange}
                />
            )}
            {isTextAnnotation && (
                <CustomTextControls
                    textAnnotation={annotation}
                    onChange={onChange}
                />
            )}
        </div>
    );
            }

export default StyleControls;