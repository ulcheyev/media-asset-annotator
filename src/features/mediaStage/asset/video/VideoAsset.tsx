import { useCallback, useEffect, useRef, useState } from 'react';
import VideoControls from './videoControls/VideoControls';

import type { MediaAsset, MediaLayout } from '../../../../types/intern/media';
import type { Annotation, TimeRange } from '../../../../types/intern/annotation';

import { clamp } from '../../../../utils/videoTime.utils';
import { usePlayback } from '../../../context/playback/usePlayback';

interface VideoAssetProps {
  asset: MediaAsset;
  layout: MediaLayout;
  selectedAnnotation?: Annotation;
  onUpdateAnnotation?: (annotation: Annotation) => void;
  isEditing?: boolean;
  children?: (size: { w: number; h: number; scaleX: number; scaleY: number }) => React.ReactNode;
}

export default function VideoAsset({
  asset,
  layout,
  selectedAnnotation,
  onUpdateAnnotation,
  isEditing,
  children,
}: VideoAssetProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewportSize, setViewportSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  const { duration, setDuration, cursor, setTime } = usePlayback();

  /* ---------------- lifecycle ---------------- */

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setDuration(video.duration);
      setViewportSize({
        w: video.clientWidth,
        h: video.clientHeight,
      });
    };

    const handleTimeUpdate = () => {
      setTime(video.currentTime);
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
  }, [setDuration, setTime]);

  /* ---------------- playback controls ---------------- */

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
    (interval: TimeRange) => {
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
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={asset.src}
          className="max-w-full max-h-full object-contain"
          controls={false}
        />

        {/* CANVAS OVERLAY — only when size is known */}
        {viewportSize &&
          children?.({
            w: layout.width,
            h: layout.height,
            scaleX: layout.scale,
            scaleY: layout.scale,
          })}
      </div>

      {/* CONTROLS */}
      {duration > 0 && (
        <VideoControls
          isEditing={isEditing}
          duration={duration}
          currentTime={cursor.t}
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
