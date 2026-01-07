import {Pause, Play} from 'lucide-react';

interface Props {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export function PlayPauseButton({ isPlaying, onPlay, onPause }: Props) {
  return (
    <button
      onClick={isPlaying ? onPause : onPlay}
      className="flex h-8 w-8 items-center justify-center rounded-md
                 bg-neutral-400 hover:bg-neutral-200 transition"
    >
      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
    </button>
  );
}
