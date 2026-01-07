import {formatTime, toPercent} from '../../../../../utils/videoTime.utils.ts';
import type {TimeRange} from "../../../../../types/intern/annotation.ts";

interface Props {
    interval: TimeRange;
    duration: number;
    onDrag: (mode:  'start' | 'end' | null) => void;
}

export const AnnotationInterval = ({ interval, duration, onDrag }: Props) => {
    return (
        <div
            className="absolute top-1 bottom-1 rounded
                 bg-blue-500/70 border border-blue-400 "
            style={{
                left: toPercent(interval.start, duration),
                width: toPercent(interval.end - interval.start, duration),
            }}
        >
            <div className="absolute -top-5 left-0 text-xs text-white">{formatTime(interval.start)}</div>
            <div className="absolute -top-5 right-0 text-xs text-white">{formatTime(interval.end)}</div>

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
