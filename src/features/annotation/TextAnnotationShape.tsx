import { Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { Annotation, TextAnnotation } from '../../types/intern/annotation.ts';
import Konva from 'konva';
import { Constants } from '../../utils/Constants.ts';

interface TextAreaProps {
  textNode: Konva.Text;
  onChange: (value: string) => void;
  onClose: () => void;
}

const TextArea = ({ textNode, onChange, onClose }: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const stage = textNode.getStage();
    if (!stage) return;

    const textPosition = textNode.absolutePosition();
    const stageBox = stage.container().getBoundingClientRect();

    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = `${stageBox.top + textPosition.y}px`;
    textarea.style.left = `${stageBox.left + textPosition.x}px`;
    textarea.style.width = `${textNode.width()}px`;
    textarea.style.height = `${textNode.height()}px`;

    textarea.style.fontSize = `${textNode.fontSize()}px`;
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.lineHeight = String(textNode.lineHeight());
    textarea.style.color = 'white';

    textarea.style.border = '1px solid white';
    textarea.style.background = 'transparent';
    textarea.style.padding = '0';
    textarea.style.margin = '0';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.overflow = 'hidden';

    textarea.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onChange(textarea.value);
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target !== textarea) {
        onChange(textarea.value);
        onClose();
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [textNode, onChange, onClose]);

  return <textarea ref={textareaRef} />;
};

interface TextEditorProps {
  textNode: Konva.Text;
  onChange: (value: string) => void;
  onClose: () => void;
}

const TextEditor = (props: TextEditorProps) => {
  return (
    <Html>
      <TextArea {...props} />
    </Html>
  );
};

interface EditableTextProps {
  annotation: TextAnnotation;
  onUpdate: (annotation: Annotation) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const EditableText = ({ annotation, onUpdate, isSelected, onSelect }: EditableTextProps) => {
  const textRef = useRef<Konva.Text | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);
  const [textNode, setTextNode] = useState<Konva.Text | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(annotation.text);

  useEffect(() => {
    if (trRef.current && textRef.current && !isEditing) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
    if (isEditing && textRef.current) {
      setTextNode(textRef.current);
    }
    if (!isEditing) {
      setTextNode(null);
    }
  }, [isEditing]);

  const handleTextDblClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleTextChange = useCallback((value: string) => {
    setText(value);
  }, []);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const x = node.x();
    const y = node.y();
    onUpdate({
      ...annotation,
      x,
      y,
    });
  };

  return (
    <>
      <Text
        ref={textRef}
        text={text}
        x={annotation.x}
        y={annotation.y}
        fill={annotation.style.color}
        fontSize={annotation.fontSize}
        draggable
        onDragEnd={handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={handleTextDblClick}
        onDblTap={handleTextDblClick}
        visible={!isEditing}
      />

      {isEditing && textNode && (
        <TextEditor
          textNode={textNode}
          onChange={handleTextChange}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default EditableText;
