import { Stage, Layer } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Point } from '../../types/geometry';
import type { Annotation } from '../../types/intern/annotation';
import { AnnotationsLayer } from '../annotation/AnnotationsLayer.tsx';

interface StageSurfaceProps {
  width: number;
  height: number;
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

export const StageSurface = ({
  width,
  height,
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
  const getStagePoint = (e: KonvaEventObject<MouseEvent>): Point | null => {
    const stage = e.target.getStage();
    if (!stage) return null;

    const pos = stage.getPointerPosition();
    if (!pos) return null;

    return {
      x: pos.x,
      y: pos.y,
    };
  };

  const withPoint = (fn: (p: Point) => void) => (e: KonvaEventObject<MouseEvent>) => {
    if (!isEditing) return;
    const p = getStagePoint(e);
    if (p) fn(p);
  };

  const getOnClick = () => {
    return (e: KonvaEventObject<MouseEvent>) => {
      if (e.target === e.target.getStage()) {
        onSelect(null);
      }
    };
  };

  return (
    <Stage
      width={width}
      height={height}
      className="absolute inset-0"
      onMouseDown={withPoint(onPointerDown)}
      onMouseMove={withPoint(onPointerMove)}
      onMouseUp={withPoint(onPointerUp)}
      onClick={getOnClick()}
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
