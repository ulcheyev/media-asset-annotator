import { useEffect, useRef, useState } from 'react';
import type { Annotation, TimeRange } from '../../../../../types/intern/annotation';

import {
  computeNextInterval,
  getTimeFromClientX,
  isValidInterval,
} from '../../../../../utils/videoTime.utils';

import { PlayPauseButton } from './PlayPauseButton';
import { HoverTimeBubble } from './HoverTimeBubble';
import { Playhead } from './Playhead';
import { AnnotationInterval } from './AnnotationInterval';

interface Props {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  selectedAnnotation: Annotation | null;
  isEditing?: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (t: number) => void;
  onCommitAnnotationTime: (interval: TimeRange) => void;
}

type DragMode = 'move' | 'start' | 'end' | null;

export default function VideoControls({
  duration,
  currentTime,
  isPlaying,
  selectedAnnotation,
  isEditing = false,
  onPlay,
  onPause,
  onSeek,
  onCommitAnnotationTime,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [dragMode, setDragMode] = useState<DragMode>(null);

  /** Local draft interval used ONLY during dragging */
  const [draftInterval, setDraftInterval] = useState<TimeRange | null>(null);

  /** Committed interval from annotation */
  const committedInterval = selectedAnnotation?.time ?? null;

  /** Interval to render (draft during drag, committed otherwise) */
  const interval = draftInterval ?? committedInterval;

  const startDragging = (mode: DragMode) => {
    if (!isEditing || !selectedAnnotation) return;

    if (isPlaying) onPause();

    setDraftInterval(selectedAnnotation.time);
    setDragMode(mode);
  };

  const stopDragging = () => {
    if (draftInterval) {
      onCommitAnnotationTime(draftInterval);
    }

    setDraftInterval(null);
    setDragMode(null);
  };

  useEffect(() => {
    if (!dragMode || !trackRef.current || !interval) return;

    const onMove = (e: MouseEvent) => {
      const rect = trackRef.current!.getBoundingClientRect();
      const t = getTimeFromClientX(e.clientX, rect, duration);

      onSeek(t);

      const next = computeNextInterval(dragMode, t, interval);
      if (isValidInterval(next, duration)) {
        setDraftInterval(next);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', stopDragging);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [dragMode, interval, duration, onSeek]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    setHoverTime(getTimeFromClientX(e.clientX, rect, duration));
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    onSeek(getTimeFromClientX(e.clientX, rect, duration));
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-4">
        <PlayPauseButton isPlaying={isPlaying} onPlay={onPlay} onPause={onPause} />

        <div
          ref={trackRef}
          className="relative flex-1 h-6 rounded-md bg-neutral-600/80 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverTime(null)}
          onClick={handleClick}
        >
          {hoverTime !== null && <HoverTimeBubble time={hoverTime} duration={duration} />}

          {interval && (
            <AnnotationInterval interval={interval} duration={duration} onDrag={startDragging} />
          )}

          <Playhead time={currentTime} duration={duration} isPlaying={isPlaying} />
        </div>
      </div>
    </div>
  );
}
