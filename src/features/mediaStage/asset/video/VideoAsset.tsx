import { useEffect, useRef, useState, useCallback } from 'react';
import VideoControls from './VideoControls';

import type { MediaAsset } from '../../../../types/intern/media';
import type { Annotation } from '../../../../types/intern/annotation';
import type { TimeInterval } from './VideoControls';

import { clamp } from './videoTime.utils';

interface VideoAssetProps {
    asset: MediaAsset;
    selectedAnnotation?: Annotation;
    onUpdateAnnotation?: (annotation: Annotation) => void;
    onTimeUpdate?: (time: number) => void;
    isEditing?: boolean;
    children?: React.ReactNode;
}

export default function VideoAsset({
                                       asset,
                                       selectedAnnotation,
                                       onUpdateAnnotation,
                                       onTimeUpdate,
                                       isEditing,
                                       children,
                                   }: VideoAssetProps) {
    /* ---------------- refs ---------------- */

    const videoRef = useRef<HTMLVideoElement>(null);

    /* ---------------- state ---------------- */

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    /* ---------------- video sync ---------------- */

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => setDuration(video.duration);

        const handleTimeUpdate = () => {
            const time = video.currentTime;
            setCurrentTime(time);
            onTimeUpdate?.(time);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('loadedmetadata', handleLoaded);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoaded);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, [onTimeUpdate]);

    /* ---------------- control API ---------------- */

    const play = useCallback(() => {
        videoRef.current?.play();
    }, []);

    const pause = useCallback(() => {
        videoRef.current?.pause();
    }, []);

    const seek = useCallback(
        (time: number) => {
            if (!videoRef.current) return;
            videoRef.current.currentTime = clamp(time, 0, duration);
        },
        [duration],
    );

    const updateAnnotationInterval = useCallback(
        (interval: TimeInterval) => {
            if (!selectedAnnotation || !onUpdateAnnotation) return;

            onUpdateAnnotation({
                ...selectedAnnotation,
                time: interval,
            });
        },
        [selectedAnnotation, onUpdateAnnotation],
    );

    /* ---------------- render ---------------- */

    return (
        <div className="flex flex-col w-full h-full">
            {/* VIDEO VIEWPORT */}
            <div className="relative flex-1 bg-black overflow-hidden">
                <video
                    ref={videoRef}
                    src={asset.src}
                    controls={false}
                />
                {children}
            </div>

            {/* CONTROLS */}
            {duration > 0 && (
                <VideoControls
                    isEditing={isEditing}
                    duration={duration}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    selectedAnnotation={selectedAnnotation ?? null}
                    onPlay={play}
                    onPause={pause}
                    onSeek={seek}
                    onUpdateAnnotationTime={updateAnnotationInterval}
                />
            )}
        </div>
    );
}
