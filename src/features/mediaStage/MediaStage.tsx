import React, { useRef, useState } from 'react';
import { Stage, Line, Layer } from 'react-konva';
import type { MediaAsset, MediaLayout } from '../../types/intern/media.ts';
import type { Annotation } from '../../types/intern/annotation.ts';
import { AnnotationsLayer } from './AnnotationsLayer.tsx';
import { Constants } from '../../utils/Constants.ts';
import { MediaAssetContainer } from './MediaAssetContainer.tsx';

interface MediaStageProps {
  layout: MediaLayout;
  asset: MediaAsset;
  annotations: Annotation[];
  onUpdate: (annotations: Annotation[]) => void;
  isEditing: boolean
}

export const MediaStage = ({ layout, asset, annotations, onUpdate, isEditing }: MediaStageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [draftPoints, setDraftPoints] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function updateAnnotation(updated: Annotation) {
    const upd = annotations.map((a) => (a.id === updated.id ? updated : a));
    onUpdate(upd);
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {}

  function handleVideoMeta(e: React.SyntheticEvent<HTMLVideoElement>) {}

  function handleMouseDown(e: any) {
    // if (tool !== Constants.POLYLINE_TYPE_LABEL) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setDraftPoints([pos.x, pos.y]);
  }

  function handleMouseMove(e: any) {
    // if (tool !== Constants.POLYLINE_TYPE_LABEL || draftPoints.length === 0) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setDraftPoints((prev) => [...prev, pos.x, pos.y]);
  }

  function handleMouseUp() {
    // if (tool !== "polyline" || draftPoints.length < 4) {
    //     setDraftPoints([]);
    //     return;
    // }

    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      // @ts-ignore
      type: Constants.POLYLINE_TYPE_LABEL,
      label: 'New polyline',
      time: { start: 0, end: Infinity },
      points: draftPoints,
      style: {
        type: 'stroke',
        color: '#ff0000',
        strokeWidth: 2,
        opacity: 1,
      },
    };

    // (prev => [...prev, newAnnotation]);
    setDraftPoints([]);
  }

  const handleCanvasClick = () => {
    if (selectedId !== null) {
      setSelectedId(null);
    }
  };

  return (
    <>
      <MediaAssetContainer
        asset={asset}
        width={layout.width}
        height={layout.height}
        scale={layout.scale}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="absolute inset-0" style={{ pointerEvents: isEditing ? "auto" : "none" }}>
        <Stage
          onClick={handleCanvasClick}
          width={layout.width * layout.scale}
          height={layout.height * layout.scale}
          scaleX={layout.scale}
          scaleY={layout.scale}
          // onMouseDown={handleMouseDown}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
        >

          <Layer>
            <AnnotationsLayer
              annotations={annotations}
              mediaType={asset.type}
              sceneHeight={layout.height * layout.scale}
              sceneWidth={layout.width * layout.scale}
              selectedId={selectedId}
              onSelect={setSelectedId}
              currentTime={currentTime}
              onUpdate={updateAnnotation}
            />

            {draftPoints.length > 0 && (
              <Line points={draftPoints} stroke="#ff0000" strokeWidth={2} opacity={0.7} />
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
};
