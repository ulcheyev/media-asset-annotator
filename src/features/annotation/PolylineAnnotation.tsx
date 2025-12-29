import type { Annotation, PolylineAnnotation } from '../../types/intern/annotation.ts';
import { Line } from 'react-konva';
import Konva from 'konva';
import { Constants } from '../../utils/Constants.ts';

interface PolylineAnnotationProps {
  annotation: PolylineAnnotation;
  onUpdate: (updated: Annotation) => void;
  isSelected: boolean;
  onSelect: () => void;
}
const PolylineAnnotationShape = ({
  annotation,
  onUpdate,
  isSelected,
  onSelect,
}: PolylineAnnotationProps) => {
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const dx = node.x();
    const dy = node.y();
    node.position({ x: 0, y: 0 });
    const movedPoints = annotation.points.map((v, i) => (i % 2 === 0 ? v + dx : v + dy));
    onUpdate({
      ...annotation,
      points: movedPoints,
    });
  };

  return (
    <Line
      points={annotation.points}
      stroke={annotation.style.color}
      strokeWidth={annotation.style.strokeWidth}
      opacity={annotation.style.opacity}
      onClick={onSelect}
      onTap={onSelect}
      draggable
      dash={isSelected ? Constants.SELECTED_POLYLINE_ANNOTATION_DASH_PARAMETER : undefined}
      onDragEnd={handleDragEnd}
      shadowForStrokeEnabled={isSelected}
      shadowColor={isSelected ? Constants.SELECTED_ANNOTATION_BLUR_COLOR : undefined}
      shadowBlur={isSelected ? Constants.SELECTED_ANNOTATION_BLUR : 0}
      shadowOffsetX={0}
      shadowOffsetY={0}
      shadowOpacity={1}
    />
  );
};

export default PolylineAnnotationShape;
