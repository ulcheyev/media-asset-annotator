import { useRef, useState } from 'react';
import type { Annotation, AnnotationPatch } from '../../../types/intern/annotation';
import {
  clamp,
  computeNextInterval,
  isValidInterval,
  roundTo,
} from '../../../utils/videoTime.utils';
import { Constants } from '../../../utils/Constants.ts';

interface TimeIntervalControlsProps {
  annotation: Annotation;
  duration: number;
  onPreview: (patch: AnnotationPatch) => void;
  onCommit: (before: Annotation, after: Annotation) => void;
}

export const TimeIntervalControls = ({
  annotation,
  duration,
  onPreview,
  onCommit,
}: TimeIntervalControlsProps) => {
  const beforeRef = useRef<Annotation | null>(null);
  const { start, end } = annotation.time;

  const [localStart, setLocalStart] = useState<string>('');
  const [localEnd, setLocalEnd] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  const beginEdit = () => {
    if (!isEditing) {
      beforeRef.current = annotation;

      setLocalStart(start.toFixed(Constants.ANNOTATION_DEFAULT_TIME_INTERVAL_PRECISION));
      setLocalEnd(end.toFixed(Constants.ANNOTATION_DEFAULT_TIME_INTERVAL_PRECISION));

      setIsEditing(true);
    }
  };

  const previewInterval = (next: { start: number; end: number }) => {
    const safe = {
      start: roundTo(clamp(next.start, 0, duration)),
      end: roundTo(clamp(next.end, 0, duration)),
    };

    if (!isValidInterval(safe, duration)) return;

    onPreview({ time: safe });
  };

  const handleStartChange = (raw: string) => {
    setLocalStart(raw);

    const value = parseFloat(raw);
    if (Number.isNaN(value)) return;

    const next = computeNextInterval('start', value, annotation.time);
    previewInterval(next);
  };

  const handleEndChange = (raw: string) => {
    setLocalEnd(raw);

    const value = parseFloat(raw);
    if (Number.isNaN(value)) return;

    const next = computeNextInterval('end', value, annotation.time);
    previewInterval(next);
  };

  const commitEdit = () => {
    if (!beforeRef.current) return;

    const normalized = {
      start: roundTo(annotation.time.start),
      end: roundTo(annotation.time.end),
    };

    onCommit(beforeRef.current, {
      ...annotation,
      time: normalized,
    });

    beforeRef.current = null;
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    beforeRef.current = null;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-neutral-300">Time Interval</div>

      <div className="flex gap-3">
        <div className="flex flex-col flex-1">
          <label className="text-xs text-neutral-400 mb-1">Start</label>
          <input
            type="number"
            step="0.01"
            min={0}
            max={duration}
            value={
              isEditing
                ? localStart
                : start.toFixed(Constants.ANNOTATION_DEFAULT_TIME_INTERVAL_PRECISION)
            }
            onFocus={beginEdit}
            onChange={(e) => handleStartChange(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit();
              if (e.key === 'Escape') cancelEdit();
            }}
            className="px-3 py-2 text-sm rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-xs text-neutral-400 mb-1">End</label>
          <input
            type="number"
            step="0.01"
            min={0}
            max={duration}
            value={
              isEditing
                ? localEnd
                : end.toFixed(Constants.ANNOTATION_DEFAULT_TIME_INTERVAL_PRECISION)
            }
            onFocus={beginEdit}
            onChange={(e) => handleEndChange(e.target.value)}
            onBlur={commitEdit}
            className="px-3 py-2 text-sm rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-neutral-600"
          />
        </div>
      </div>
    </div>
  );
};
