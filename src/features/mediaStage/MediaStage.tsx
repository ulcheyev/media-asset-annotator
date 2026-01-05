import {useRef, useState} from 'react';
import { Stage, Layer } from 'react-konva';
import type { MediaAsset, MediaLayout } from '../../types/intern/media';
import type { Annotation } from '../../types/intern/annotation';
import { AnnotationsLayer } from './AnnotationsLayer';
import { MediaAssetContainer } from './asset/MediaAssetContainer.tsx';
import type {Tool} from "../toolbox/Tools.tsx";

interface MediaStageProps {
  layout: MediaLayout;
  asset: MediaAsset;
  activeTool: Tool;
  annotations: Annotation[];
  onUpdate: (annotations: Annotation[]) => void;
  isEditing: boolean;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export const MediaStage = ({
  layout,
  asset, activeTool,
  annotations,
  onUpdate,
  isEditing,
  selectedId,
  setSelectedId,
}: MediaStageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  function updateAnnotation(updated: Annotation) {
    const upd = annotations.map((a) => (a.id === updated.id ? updated : a));
    onUpdate(upd);
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };


  const handleCanvasClick = () => {
    if (selectedId !== null) {
      setSelectedId(null);
    }
  };



  return (
    <>
      <MediaAssetContainer
          isEditing={isEditing}
        asset={asset}
        selectedAnnotation={selectedId ? annotations.find((a) => a.id === selectedId) : undefined}
        onUpdateAnnotation={updateAnnotation}
        width={layout.width}
        height={layout.height}
        scale={layout.scale}
        onTimeUpdate={handleTimeUpdate}
      >

      <div className="absolute inset-0" >
        <Stage
          onClick={handleCanvasClick}
          width={layout.width * layout.scale}
          height={layout.height * layout.scale}
          scaleX={layout.scale}
          scaleY={layout.scale}
        >
          <Layer>
            <AnnotationsLayer
              annotations={annotations}
                isEditing={isEditing}
              mediaType={asset.type}
              sceneHeight={layout.height * layout.scale}
              sceneWidth={layout.width * layout.scale}
              selectedId={selectedId}
              onSelect={setSelectedId}
              currentTime={currentTime}
              onUpdate={updateAnnotation}
            />
          </Layer>
        </Stage>
      </div>
      </MediaAssetContainer>
    </>
  );
};

