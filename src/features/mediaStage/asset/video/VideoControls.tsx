
import { useEffect, useRef, useState } from 'react';
import type { Annotation } from '../../../../types/intern/annotation';
export interface TimeInterval {
    start: number;
    end: number;
}
import {
    computeNextInterval,
    getTimeFromClientX,
    isValidInterval,
} from './videoTime.utils';

import { PlayPauseButton } from './PlayPauseButton';
import { HoverTimeBubble } from './HoverTimeBubble';
import { Playhead } from './Playhead';
import { AnnotationInterval } from './AnnotationInterval';

interface Props {
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    selectedAnnotation: Annotation | null;
    onPlay: () => void;
    isEditing?: boolean;
    onPause: () => void;
    onSeek: (t: number) => void;
    onUpdateAnnotationTime: (interval: TimeInterval) => void;
}

type DragMode = 'move' | 'start' | 'end' | null;

export default function VideoControls({
                                          duration,
                                          currentTime,
                                          isPlaying,
                                          selectedAnnotation,
                                          onPlay,
                                          onPause,
                                        isEditing,
                                          onSeek,
                                          onUpdateAnnotationTime,
                                      }: Props) {
    const trackRef = useRef<HTMLDivElement>(null);

    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [dragMode, setDragMode] = useState<DragMode>(null);

    const interval = selectedAnnotation?.time ?? null;

    useEffect(() => {
        if (!dragMode || !interval) return;

        const onMove = (e: MouseEvent) => {
            const rect = trackRef.current!.getBoundingClientRect();
            const t = getTimeFromClientX(e.clientX, rect, duration);
            const next = computeNextInterval(dragMode, t, interval);

            if (isValidInterval(next, duration)) {
                onUpdateAnnotationTime(next);
            }
        };

        const stop = () => setDragMode(null);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', stop);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', stop);
        };
    }, [dragMode, interval, duration, onUpdateAnnotationTime]);

    const onDragInterval = isEditing ? setDragMode : () => {};

    return (
        <div className="px-4 py-2">
            <div className="flex items-center gap-4">
                <PlayPauseButton
                    isPlaying={isPlaying}
                    onPlay={onPlay}
                    onPause={onPause}
                />

                <div
                    ref={trackRef}
                    className="relative flex-1 h-6 rounded-md bg-neutral-600/80 cursor-pointer"
                    onMouseMove={(e) => {
                        const rect = trackRef.current!.getBoundingClientRect();
                        setHoverTime(getTimeFromClientX(e.clientX, rect, duration));
                    }}
                    onMouseLeave={() => setHoverTime(null)}
                    onClick={(e) => {
                        const rect = trackRef.current!.getBoundingClientRect();
                        onSeek(getTimeFromClientX(e.clientX, rect, duration));
                    }}
                >
                    {hoverTime !== null && (
                        <HoverTimeBubble time={hoverTime} duration={duration} />
                    )}
                    {interval && (
                        <AnnotationInterval
                            interval={interval}
                            duration={duration}
                            onDrag={onDragInterval}
                        />
                    )}

                    <Playhead
                        time={currentTime}
                        duration={duration}
                        isPlaying={isPlaying}
                    />
                </div>
            </div>
        </div>
    );
}
