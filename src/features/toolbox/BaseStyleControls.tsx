import * as Popover from '@radix-ui/react-popover';
import * as Slider from '@radix-ui/react-slider';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

import type { Annotation } from '../../types/intern/annotation';

interface BaseStyleControlsProps {
  annotation: Annotation;
  onChange: (style: Partial<Annotation['style']>) => void;
}

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

export const ControlSlider = ({ label, value, min, max, step, onChange }: ControlSliderProps) => {
  const [internal, setInternal] = useState(value);
  const percent = ((internal - min) / (max - min)) * 100;

  return (
    <div className="space-y-2" >
      <div className="text-sm text-neutral-300">{label}</div>

      <div className="relative">
        <div
          className="
            absolute -top-7
            text-xs px-2 py-0.5 rounded
            bg-neutral-800 text-white
            translate-x-[-50%]
          "
          style={{ left: `${percent}%` }}
        >
          {internal.toFixed(step < 1 ? 2 : 0)}
        </div>

        <Slider.Root
          value={[internal]}
          min={min}
          max={max}
          step={step}
          onValueChange={([v]) => {
            setInternal(v);
            onChange(v);
          }}
          className="relative flex items-center h-5"
        >
          <Slider.Track className="relative h-1 w-full rounded bg-neutral-700">
            <Slider.Range className="absolute h-full rounded bg-white" />
          </Slider.Track>

          <Slider.Thumb
            className="
              block w-4 h-4
              bg-white rounded-full
              shadow
              hover:bg-neutral-200
              focus:outline-none
              focus:ring-2 focus:ring-neutral-500
            "
          />
        </Slider.Root>
      </div>
    </div>
  );
};

const BaseStyleControls = ({ annotation, onChange }: BaseStyleControlsProps) => {
  const color = annotation.style.color ?? '#ffffff';
  const opacity = annotation.style.opacity ?? 1;

  return (
      <>
          {/* Color */}
          <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-300">Color</span>

              <Popover.Root>
                  <Popover.Trigger asChild>
                      <button
                          className="w-6 h-6 rounded border border-neutral-600"
                          style={{ backgroundColor: color }}
                      />
                  </Popover.Trigger>

                  <Popover.Portal>
                      <Popover.Content
                          side="bottom"
                          align="start"
                          className="p-3 bg-neutral-900 rounded shadow-xl z-50"
                      >
                          <HexColorPicker color={color} onChange={(c) => onChange({ color: c })} />
                      </Popover.Content>
                  </Popover.Portal>
              </Popover.Root>
          </div>

          {/* Opacity */}
          <ControlSlider
              label="Opacity"
              min={0}
              max={1}
              step={0.01}
              value={opacity}
              onChange={(v) => onChange({ opacity: v })}
          />


      </>

  );
};

export default BaseStyleControls;
