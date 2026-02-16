import { useCallback, useEffect, useRef, useState } from 'react';
import VideoControls from './videoControls/VideoControls';

import type { MediaAsset, MediaLayout, MediaResolution } from '../../../../types/intern/media';
import type { Annotation, TimeRange } from '../../../../types/intern/annotation';

import { clamp } from '../../../../utils/videoTime.utils';
import { usePlayback } from '../../../context/playback/usePlayback';

interface VideoAssetProps {
  asset: MediaAsset;
  layout: MediaLayout | null;
  onAssetSrcReady: (mediaResolution: MediaResolution) => void;
  selectedAnnotation?: Annotation;
  onCommitAnnotation?: (before: Annotation, after: Annotation) => void;
  isEditing?: boolean;
  setActive?: (active: boolean) => void;
  children: React.ReactNode;
}

export default function VideoAsset({
  asset,
  onAssetSrcReady,
  selectedAnnotation,
  onCommitAnnotation,
  setActive,
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setDuration(video.duration);
      setViewportSize({
        w: video.videoWidth,
        h: video.videoHeight,
      });
    };

    const handleTimeUpdate = () => {
      setTime(video.currentTime);
    };

    const notify = () => {
      onAssetSrcReady({
        naturalWidth: video.videoWidth,
        naturalHeight: video.videoHeight,
        clientWidth: video.clientWidth,
        clientHeight: video.clientHeight,
      });
    };

    const handlePlay = () => {
      setActive?.(true);
      setIsPlaying(true);
    };
    const handlePause = () => {
      setActive?.(false);
      setIsPlaying(false);
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    const ro = new ResizeObserver(notify);
    ro.observe(video);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [setDuration, setTime]);

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
      if (!selectedAnnotation || !onCommitAnnotation) return;
      onCommitAnnotation(selectedAnnotation, {
        ...selectedAnnotation,
        time: interval,
      });
    },
    [selectedAnnotation, onCommitAnnotation],
  );

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
        {viewportSize && children}
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
          onCommitAnnotationTime={updateAnnotationInterval}
        />
      )}
    </div>
  );
}
