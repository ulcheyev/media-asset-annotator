import { formatTime, toPercent } from './videoTime.utils';

interface Props {
    time: number;
    duration: number;
    isPlaying: boolean;
}

export function Playhead({ time, duration, isPlaying }: Props) {
    return (
        <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-20"
            style={{ left: toPercent(time, duration) }}
        >
            {isPlaying && (
                <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2
                     text-xs px-1 rounded bg-red-500 text-white"
                >
                    {formatTime(time)}
                </div>
            )}
        </div>
    );
}
