import type { Annotation, PolylineAnnotation } from '../../types/intern/annotation';
import { Line } from 'react-konva';
import Konva from 'konva';
import SelectableAnnotation from './SelectableAnnotation.tsx';
import { useRef } from 'react';

interface PolylineAnnotationProps {
  annotation: PolylineAnnotation;
  isEditing: boolean;
  onCommit: (before: Annotation, after: Annotation) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const PolylineAnnotationShape = ({
  annotation,
  isEditing,
  onCommit,
  isSelected,
  onSelect,
}: PolylineAnnotationProps) => {

  const lineRef = useRef<Konva.Line>(null);
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target as Konva.Line;

    const dx = node.x();
    const dy = node.y();

    node.position({ x: 0, y: 0 });

    const newPoints = annotation.points.map((v, i) => (i % 2 === 0 ? v + dx : v + dy));

    onCommit(annotation, { ...annotation, points: newPoints });
  };

  const handleTransformEnd = (node: Konva.Node) => {
    const line = node as Konva.Line;
    const stage = line.getStage();
    if (!stage) return;

    const stageScaleX = stage.scaleX();
    const stageScaleY = stage.scaleY();

    const localPoints = line.points();
    const absTransform = line.getAbsoluteTransform();

    const newPoints: number[] = [];

    for (let i = 0; i < localPoints.length; i += 2) {
      const p = absTransform.point({
        x: localPoints[i],
        y: localPoints[i + 1],
      });

      // REMOVE konva internal stage scale before storing
      newPoints.push(
          p.x / stageScaleX,
          p.y / stageScaleY
      );
    }

    line.setAttrs({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    });

    onCommit(annotation,
        {
      ...annotation,
      points: newPoints,
    });
  };

  return (
    <SelectableAnnotation
      isSelected={isSelected}
      isTransformable={isEditing && true}
      nodeRef={lineRef}
      onTransformCommit={handleTransformEnd}
    >
      <Line
        ref={lineRef}
        fill={annotation.style.fill}
        closed={annotation.style.fill !== 'none'}
        points={annotation.points}
        stroke={annotation.style.color}
        strokeWidth={annotation.style.strokeWidth}
        opacity={annotation.style.opacity}
        onClick={onSelect}
        draggable={isSelected && isEditing}
        onDragEnd={handleDragEnd}
      />
    </SelectableAnnotation>
  );
};

export default PolylineAnnotationShape;
