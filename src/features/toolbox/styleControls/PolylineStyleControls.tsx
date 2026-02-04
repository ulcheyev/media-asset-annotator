import type { AnnotationPatch, PolylineAnnotation } from '../../../types/intern/annotation.ts';
import { ControlSlider } from './BaseStyleControls.tsx';
import { Constants } from '../../../utils/Constants.ts';
import * as Popover from '@radix-ui/react-popover';
import { ColorPicker } from './ColorPicker.tsx';

interface PolylineStyleControlsProps {
  annotation: PolylineAnnotation;
  onChange: (patch: AnnotationPatch) => void;
  onCommit: (before: PolylineAnnotation, after: PolylineAnnotation) => void;
}

const PolylineStyleControls = ({ annotation, onChange, onCommit }: PolylineStyleControlsProps) => {
  const strokeWidth = annotation.style.strokeWidth ?? 1;
  const fill = annotation.style.fill ?? 'transparent';
  return (
    <div className="space-y-5 border-t border-neutral-700 pt-4">
      <ControlSlider
        label="Stroke width"
        min={1}
        max={Constants.MAX_STROKE_WIDTH}
        step={1}
        value={strokeWidth}
        onPreview={(v) =>
          onChange({
            style: { strokeWidth: v },
          })
        }
        onCommit={(before, after) =>
          onCommit(
            { ...annotation, style: { ...annotation.style, strokeWidth: before } },
            { ...annotation, style: { ...annotation.style, strokeWidth: after } },
          )
        }
      />
      {/* Color */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-300">Fill color</span>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="w-6 h-6 rounded border border-neutral-600"
              style={{ backgroundColor: fill }}
            />
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="start"
              className="p-3 bg-neutral-900 rounded shadow-xl z-50"
            >
              <ColorPicker
                color={fill}
                onPreview={(c) => onChange({ style: { fill: c } })}
                onCommit={(before, after) =>
                  onCommit(
                    { ...annotation, style: { ...annotation.style, fill: before } },
                    { ...annotation, style: { ...annotation.style, fill: after } },
                  )
                }
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
};

export default PolylineStyleControls;
