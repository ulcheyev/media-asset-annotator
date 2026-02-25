import { useContext } from 'react';
import { PlaybackContext } from './PlaybackContext.ts';
import type { PlaybackInternalState, PlaybackState } from './PlaybackContext.types.ts';

/* 🔓 Public hook */
export const usePlayback = (): PlaybackState => {
  const ctx = useContext(PlaybackContext);
  if (!ctx) throw new Error('PlaybackProvider missing');

  return {
    cursor: ctx.cursor,
    duration: ctx.duration,
    isActive: ctx.isActive,
    setPosition: ctx.setPosition,
    setCursor: ctx.setCursor,
    setDuration: ctx.setDuration,
    setActive: ctx.setActive,
  };
};

/* 🔒 Internal hook (Editor only) */
export const usePlaybackInternal = (): PlaybackInternalState => {
  const ctx = useContext(PlaybackContext);
  if (!ctx) throw new Error('PlaybackProvider missing');

  return ctx;
};