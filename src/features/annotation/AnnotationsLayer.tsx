import type { MediaType } from '../../types/intern/media.ts';
import type { Annotation } from '../../types/intern/annotation.ts';
import TextAnnotationShape from './TextAnnotationShape.tsx';
import PolylineAnnotationShape from './PolylineAnnotation.tsx';
import {isAnnotationVisible} from "../../utils/mediaAsset.utils.ts";

interface Props {
  annotations: Annotation[];
  mediaType: MediaType;
  sceneWidth: number;
  sceneHeight: number;
  currentTime: number;
  isActive: boolean | undefined;
  onCommit: (before: Annotation, after: Annotation) => void;
  isEditing: boolean;
  selectedId?: string | null;
  onSelect: (annotationId: string) => void;
}

export const AnnotationsLayer = ({
  annotations,
  currentTime,
  onCommit,
  isEditing,
  selectedId,
  onSelect,
}: Props) => {

  const filtered = annotations.filter((a) =>
      isAnnotationVisible(a, currentTime)
  );

  return (
    <>
      {filtered.map((a) => {
        if (a.kind === 'polyline') {
          return (
            <PolylineAnnotationShape
              key={a.id}
              isEditing={isEditing}
              annotation={a}
              isSelected={a.id === selectedId}
              onSelect={() => onSelect(a.id)}
              onCommit={onCommit}
            />
          );
        }
        if (a.kind === 'text') {
          return (
            <TextAnnotationShape
              annotation={a}
              isEditing={isEditing}
              isSelected={a.id === selectedId}
              onSelect={() => onSelect(a.id)}
              key={a.id}
              onCommit={onCommit}
            />
          );
        }
        return null;
      })}
    </>
  );
};
