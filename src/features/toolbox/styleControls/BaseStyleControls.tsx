import * as Popover from '@radix-ui/react-popover';
import * as Slider from '@radix-ui/react-slider';
import {useRef} from 'react';

import type { Annotation, AnnotationPatch } from '../../../types/intern/annotation.ts';
import {ColorPicker} from "./ColorPicker.tsx";

interface BaseStyleControlsProps {
  annotation: Annotation;
  onChange: (patch: AnnotationPatch) => void;
  onCommit: (before: Annotation, after: Annotation) => void;
}

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;

  onPreview: (v: number) => void;
  onCommit: (before: number, after: number) => void;
}

export const ControlSlider = ({ label,
                                value,
                                min,
                                max,
                                step,
                                onPreview,
                                onCommit, }: ControlSliderProps) => {
  const beforeRef = useRef<number | null>(null);

  const percent = ((value - min) / (max - min)) * 100;

  const handlePointerDown = () => {
    if (beforeRef.current === null) {
      beforeRef.current = value;
    }
  };

  const handlePointerUp = () => {
    if (beforeRef.current !== null) {
      onCommit(beforeRef.current, value);
      beforeRef.current = null;
    }
  };

  return (
      <div className="space-y-2">
        <div className="text-sm text-neutral-300">{label}</div>

        <div
            className="relative"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
          <div
              className="absolute -top-7 text-xs px-2 py-0.5 rounded bg-neutral-800 text-white translate-x-[-50%]"
              style={{ left: `${percent}%` }}
          >
            {value.toFixed(step < 1 ? 2 : 0)}
          </div>

          <Slider.Root
              value={[value]}
              min={min}
              max={max}
              step={step}
              onValueChange={([v]) => {
                onPreview(v);
              }}
              className="relative flex items-center h-5"
          >
            <Slider.Track className="relative h-1 w-full rounded bg-neutral-700">
              <Slider.Range className="absolute h-full rounded bg-white" />
            </Slider.Track>

            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow" />
          </Slider.Root>
        </div>
      </div>
  );
};

const BaseStyleControls = ({ annotation, onChange, onCommit }: BaseStyleControlsProps) => {
  const color = annotation.style.color ?? '#ffffff';
  const opacity = annotation.style.opacity ?? 1;
  const label = annotation.label ?? '';

  return (
    <div className="flex flex-col gap-5">
      {/* LABEL */}
      <div className="space-y-1">
        <div className="text-sm text-neutral-300">Label</div>
        <input
          type="text"
          value={label}
          onChange={(e) => onCommit(annotation, { ...annotation, label: e.target.value })}
          placeholder="Annotation label"
          className="
            w-full
            px-3 py-2
            text-sm
            rounded
            bg-neutral-800
            border border-neutral-700
            text-white
            placeholder-neutral-500
            focus:outline-none
            focus:ring-2
            focus:ring-neutral-600
          "
        />
      </div>

      {/* COLOR */}
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
              <ColorPicker color={color} onPreview={(c) => onChange({ style: { color: c } })} onCommit={(before, after) =>  onCommit(
                  { ...annotation, style: { ...annotation.style, color: before } },
                  { ...annotation, style: { ...annotation.style, color: after } },
              )}/>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* OPACITY */}
      <ControlSlider
        label="Opacity"
        min={0}
        max={1}
        step={0.01}
        value={opacity}
        onPreview={(v) => onChange({ style: { opacity: v } })}
        onCommit={(before, after) =>
            onCommit(
                { ...annotation, style: { ...annotation.style, opacity: before } },
                { ...annotation, style: { ...annotation.style, opacity: after } },
            )
        }
      />
    </div>
  );
};

export default BaseStyleControls;
