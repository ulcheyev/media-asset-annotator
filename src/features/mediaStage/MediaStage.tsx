import { MediaAssetContainer } from './asset/MediaAssetContainer.tsx';
import { usePlayback } from '../context/playback/usePlayback.ts';
import { useEditor } from '../context/editor/useEditor.ts';
import { useMediaAsset } from '../context/mediaAsset/useMediaAsset.ts';
import { useCallback, useRef } from 'react';
import type { MediaResolution } from '../../types/intern/media.ts';

export const MediaStage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { asset, layout, setLayout } = useMediaAsset();

  const {
    annotations,
    selectedId,
    isEditing,
    updateAnnotation,
    commitAnnotation,
    selectAnnotation,
    getToolController,
  } = useEditor();

  const { cursor, isActive, setActive } = usePlayback();

  if (!asset) return null;

  const handleMediaReady = useCallback(
    (mediaResolution: MediaResolution) => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      if (
        containerWidth === 0 ||
        containerHeight === 0 ||
        mediaResolution.clientWidth === 0 ||
        mediaResolution.clientHeight === 0
      ) {
        return; // do NOT set layout yet
      }

      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = mediaResolution;

      const scaleX = containerWidth / naturalWidth;
      const scaleY = containerHeight / naturalHeight;
      const width = clientWidth > containerWidth ? containerWidth : clientWidth;
      const height = clientHeight > containerHeight ? containerHeight : clientHeight;

      setLayout({
        width,
        height,
        scaleX,
        scaleY,
      });
    },
    [setLayout],
  );

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <MediaAssetContainer
        asset={asset}
        layout={layout}
        onAssetSrcReady={handleMediaReady}
        isActive={isActive}
        setActive={setActive}
        annotations={annotations}
        selectedId={selectedId}
        isEditing={isEditing}
        currentTime={cursor.t}
        onUpdateAnnotation={(a) => updateAnnotation(a.id, a)}
        onCommitAnnotation={commitAnnotation}
        onSelectAnnotation={selectAnnotation}
        toolController={getToolController()}
      />
    </div>
  );
};
