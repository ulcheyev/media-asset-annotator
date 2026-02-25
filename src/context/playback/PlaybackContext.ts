import { createContext } from 'react';
import type { PlaybackInternalState } from './PlaybackContext.types.ts';

export const PlaybackContext = createContext<PlaybackInternalState | null>(null);
