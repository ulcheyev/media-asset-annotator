import {useContext} from 'react';
import {PlaybackContext} from './PlaybackContext.ts';
import type {PlaybackState} from './PlaybackContext.types';

export const usePlayback = (): PlaybackState => {
    const ctx = useContext(PlaybackContext);
    if (!ctx) {
        throw new Error('usePlayback must be used inside PlaybackProvider');
    }
    return ctx;
};
