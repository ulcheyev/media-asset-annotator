import { Text } from 'react-konva';
import { useRef } from 'react';
import type { Annotation, TextAnnotation } from '../../types/intern/annotation.ts';
import Konva from 'konva';
import SelectableAnnotation from './SelectableAnnotation.tsx';
import { Constants } from '../../utils/Constants.ts';

interface EditableTextProps {
  annotation: TextAnnotation;
  isEditing: boolean;
  onCommit: (before: Annotation, after: Annotation) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const EditableText = ({
  annotation,
  isEditing,
                        onCommit,
  isSelected,
  onSelect,
}: EditableTextProps) => {
  const textRef = useRef<Konva.Text | null>(null);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const x = node.x();
    const y = node.y();
    onCommit(annotation, {
      ...annotation,
      x,
      y,
    });
  };

  return (
    <SelectableAnnotation
      isSelected={isSelected}
      isTransformable={false}
      onTransformCommit={undefined}
      nodeRef={textRef}
    >
      <Text
        ref={textRef}
        text={annotation.text}
        x={annotation.x}
        y={annotation.y}
        fill={annotation.style.color}
        opacity={annotation.style.opacity}
        fontSize={annotation.fontSize}
        fontStyle={`${annotation.fontWeight}`}
        fontFamily={Constants.DEFAULT_FONT_FAMILY}
        draggable={isSelected && isEditing}
        onDragEnd={handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
      />
    </SelectableAnnotation>
  );
};

export default EditableText;
