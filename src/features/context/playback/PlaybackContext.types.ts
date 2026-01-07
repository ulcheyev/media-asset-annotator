export interface PlaybackCursor {
  t: number; // normalized time (0–1)
  x: number; // normalized horizontal position (0–1)
  y: number; // normalized vertical position (0–1)
}

export interface PlaybackState {
  cursor: PlaybackCursor;
  isActive: boolean;
  duration: number;
  setDuration: (d: number) => void;
  setTime: (t: number) => void;
  setPosition: (x: number, y: number) => void;
  setCursor: (patch: Partial<PlaybackCursor>) => void;
  setActive: (v: boolean) => void;
}
