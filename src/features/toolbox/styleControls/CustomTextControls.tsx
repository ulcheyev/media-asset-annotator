import type { AnnotationPatch, TextAnnotation } from '../../../types/intern/annotation.ts';
import { ControlSlider } from './BaseStyleControls.tsx';
import { Constants } from '../../../utils/Constants.ts';

interface TextControlsProps {
  textAnnotation: TextAnnotation;
  onChange: (patch: AnnotationPatch) => void;
  onCommit?: (before: TextAnnotation, after: TextAnnotation) => void;
}

const CustomTextControls = ({ textAnnotation, onChange, onCommit }: TextControlsProps) => {
  const fontWeight = textAnnotation.fontWeight;
  const fontSize = textAnnotation.fontSize;

  return (
    <>
      {/* Text */}
      <div className="space-y-4 border-t border-neutral-700 pt-4">
        <div className="text-sm text-neutral-300">Text</div>

        <textarea
          value={textAnnotation.text}
          onChange={(e) => onChange({ text: e.target.value })}
          rows={3}
          className="
            w-full rounded
            bg-neutral-800 text-white
            border border-neutral-600
            px-3 py-2
            resize-y
            min-h-[3rem]
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-neutral-500
          "
        />
      </div>
      {/* Font size */}
      <div className="space-y-2">
        <ControlSlider
          label="Font size"
          min={Constants.MIN_FONT_SIZE}
          max={Constants.MAX_FONT_SIZE}
          step={1}
          value={fontSize}
          onPreview={(v) => onChange({ fontSize: v })}
          onCommit={(b, a) => onCommit && onCommit( { ...textAnnotation, fontSize: b }, { ...textAnnotation, fontSize: a })}
        />
      </div>
      {/* Font weight */}
      <div className="space-y-2">
        <ControlSlider
          label="Font weight"
          min={100}
          max={900}
          step={100}
          value={fontWeight}
          onPreview={(v) => onChange({ fontWeight: v })}
            onCommit={(b, a) => onCommit && onCommit( { ...textAnnotation, fontWeight: b }, { ...textAnnotation, fontWeight: a })}
        />
      </div>
    </>
  );
};

export default CustomTextControls;
