import { formatTime, toPercent } from './videoTime.utils';

interface Props {
    time: number;
    duration: number;
}

export function HoverTimeBubble({ time, duration }: Props) {
    return (
        <div
            className="absolute -top-6 px-1 text-xs rounded bg-black/80 text-white"
            style={{
                left: toPercent(time, duration),
                transform: 'translateX(-50%)',
            }}
        >
            {formatTime(time)}
        </div>
    );
}
