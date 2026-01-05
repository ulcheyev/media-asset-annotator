import type { TimeInterval } from './VideoControls';
import { formatTime, toPercent } from './videoTime.utils';

interface Props {
    interval: TimeInterval;
    duration: number;
    onDrag: (mode: 'move' | 'start' | 'end') => void;
}

export function AnnotationInterval({
                                       interval,
                                       duration,
                                       onDrag,
                                   }: Props) {
    return (
        <div
            className="absolute top-1 bottom-1 rounded
                 bg-blue-500/70 border border-blue-400 cursor-move"
            style={{
                left: toPercent(interval.start, duration),
                width: toPercent(interval.end - interval.start, duration),
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                onDrag('move');
            }}
        >
            <div className="absolute -top-5 left-0 text-xs text-white">
                {formatTime(interval.start)}
            </div>
            <div className="absolute -top-5 right-0 text-xs text-white">
                {formatTime(interval.end)}
            </div>

            <div
                className="absolute left-0 top-0 bottom-0 w-2 bg-white
                   rounded-l cursor-ew-resize"
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onDrag('start');
                }}
            />

            <div
                className="absolute right-0 top-0 bottom-0 w-2 bg-white
                   rounded-r cursor-ew-resize"
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onDrag('end');
                }}
            />
        </div>
    );
}
