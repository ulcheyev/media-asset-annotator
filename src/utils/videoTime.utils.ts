import { Constants } from './Constants.ts';
import type { TimeRange } from '../types/intern/annotation.ts';

export const formatTime = (t: number) => {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const toPercent = (t: number, duration: number) => `${(t / duration) * 100}%`;

export const getTimeFromClientX = (x: number, rect: DOMRect, duration: number) =>
  ((x - rect.left) / rect.width) * duration;

export function computeNextInterval(
  mode: 'move' | 'start' | 'end',
  t: number,
  interval: TimeRange,
): TimeRange {
  if (mode === 'move') {
    const len = interval.end - interval.start;
    return { start: t - len / 2, end: t + len / 2 };
  }

  if (mode === 'start') {
    return { start: t, end: interval.end };
  }

  return { start: interval.start, end: t };
}

export const isValidInterval = (interval: TimeRange, duration: number) => {
  return (
    interval.start >= 0 &&
    interval.end <= duration &&
    interval.end - interval.start >= Constants.ANNOTATION_MIN_DURATION
  );
};

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
