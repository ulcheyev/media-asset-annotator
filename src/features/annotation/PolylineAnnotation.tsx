import type { Annotation, PolylineAnnotation } from '../../types/intern/annotation';
import { Line } from 'react-konva';
import Konva from 'konva';
import SelectableAnnotation from './SelectableAnnotation.tsx';
import { useRef } from 'react';

interface PolylineAnnotationProps {
  annotation: PolylineAnnotation;
  isEditing: boolean;
  onUpdate: (updated: Annotation) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const PolylineAnnotationShape = ({
  annotation,
  isEditing,
  onUpdate,
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

    onUpdate({ ...annotation, points: newPoints });
  };

  const handleTransformEnd = (node: Konva.Node) => {
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newPoints = annotation.points.map((v, i) => (i % 2 === 0 ? v * scaleX : v * scaleY));

    node.scaleX(1);
    node.scaleY(1);

    onUpdate({
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
