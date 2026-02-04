import { Stage, Layer } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Point } from '../../types/geometry';
import type { Annotation } from '../../types/intern/annotation';
import { AnnotationsLayer } from '../annotation/AnnotationsLayer.tsx';

interface StageSurfaceProps {
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  annotations: Annotation[];
  selectedId: string | null;
  isEditing: boolean;
  isActive?: boolean;
  currentTime: number;
  mediaType: 'image' | 'video';

  onSelect: (id: string | null) => void;
  onUpdate: (a: Annotation) => void;
  onCommit: (b: Annotation, a: Annotation) => void;
  onPointerDown: (p: Point) => void;
  onPointerMove: (p: Point) => void;
  onPointerUp: (p: Point) => void;
}

const getStagePoint = (e: KonvaEventObject<MouseEvent>): Point | null => {
  const stage = e.target.getStage();
  if (!stage) return null;

  const pos = stage.getPointerPosition();
  if (!pos) return null;

  const scaleX = stage.scaleX();
  const scaleY = stage.scaleY();

  return {
    x: pos.x / scaleX,
    y: pos.y / scaleY,
  };
};

export const StageSurface = ({
  width,
  height,
  scaleX,
  scaleY,
  annotations,
  selectedId,
  isEditing,
  currentTime,
  mediaType,
  onSelect,
    isActive,
  onCommit,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: StageSurfaceProps) => {
  const withPoint = (fn: (p: Point) => void) => (e: KonvaEventObject<MouseEvent>) => {
    if (!isEditing) return;
    const p = getStagePoint(e);
    if (p) fn(p);
  };

  return (
    <Stage
      width={width * scaleX}
      height={height * scaleY}
      scaleX={scaleX}
      scaleY={scaleY}
      className="absolute inset-0"
      onMouseDown={withPoint(onPointerDown)}
      onMouseMove={withPoint(onPointerMove)}
      onMouseUp={withPoint(onPointerUp)}
      onClick={(e) => {
        if (e.target === e.target.getStage()) {
          onSelect(null);
        }
      }}
    >
      <Layer>
        <AnnotationsLayer
          annotations={annotations}
          selectedId={selectedId}
          isEditing={isEditing}
          isActive={isActive}
          mediaType={mediaType}
          currentTime={currentTime}
          sceneWidth={width}
          sceneHeight={height}
          onSelect={onSelect}
          onCommit={onCommit}
        />
      </Layer>
    </Stage>
  );
};
