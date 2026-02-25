import { useCallback, useState } from 'react';
import { PlaybackContext } from './PlaybackContext.ts';
import type {PlaybackCursor, PlaybackInternalState} from './PlaybackContext.types.ts';

export const PlaybackProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursor, setCursorState] = useState<PlaybackCursor>({
    t: 0,
    x: 0,
    y: 0,
  });
  const [duration, setDuration] = useState(0);

  const [isActive, setIsActive] = useState(false);

  const setTimeInternal = useCallback((t: number) => {
    setCursorState((c) => ({ ...c, t }));
  }, []);

  const setPosition = useCallback((x: number, y: number) => {
    setCursorState((c) => ({ ...c, x, y }));
  }, []);

  const setCursor = useCallback((patch: Partial<PlaybackCursor>) => {
    setCursorState((c) => ({ ...c, ...patch }));
  }, []);

  const setActive = useCallback((v: boolean) => {
    setIsActive(v);
  }, []);

  const value: PlaybackInternalState = {
    cursor,
    duration,
    isActive,
    setTimeInternal,
    setPosition,
    setCursor,
    setDuration,
    setActive,
  };

  return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>;
};
