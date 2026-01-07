import type {AnnotationPatch, TextAnnotation} from '../../../types/intern/annotation.ts';
import {ControlSlider} from './BaseStyleControls.tsx';
import {Constants} from '../../../utils/Constants.ts';

interface TextControlsProps {
  textAnnotation: TextAnnotation;
  onChange: (patch: AnnotationPatch) => void;
}

const CustomTextControls = ({ textAnnotation, onChange }: TextControlsProps) => {
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
          onChange={(v) => onChange({ fontSize: v })}
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
          onChange={(v) => onChange({ fontWeight: v })}
        />
      </div>
    </>
  );
};

export default CustomTextControls;
