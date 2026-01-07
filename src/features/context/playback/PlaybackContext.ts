import {createContext} from 'react';
import type {PlaybackState} from './PlaybackContext.types';

export const PlaybackContext = createContext<PlaybackState | null>(null);
