import type { MediaType } from '../../types/intern/media.ts';
import type { Annotation } from '../../types/intern/annotation.ts';
import { Constants } from '../../utils/Constants.ts';
import TextAnnotationShape from './TextAnnotationShape.tsx';
import PolylineAnnotationShape from './PolylineAnnotation.tsx';

interface Props {
  annotations: Annotation[];
  mediaType: MediaType;
  sceneWidth: number;
  sceneHeight: number;
  currentTime: number;
  onUpdate: (updated: Annotation) => void;
  isEditing: boolean;
  selectedId?: string | null;
  onSelect: (annotationId: string) => void;
}

export const AnnotationsLayer = ({
  annotations,
  mediaType,
  currentTime,
  onUpdate,
  isEditing,
  selectedId,
  onSelect,
}: Props) => {
  // @ts-ignore
  // TODO preview with annotations
  const visible = annotations.filter((a) => {
    if (mediaType === Constants.IMAGE_ASSET_TYPE_LABEL) return true;
    if (a.time.start == null && a.time.end == null) return true;
    return a.time.start >= currentTime && a.time.end >= currentTime;
  });

  return (
    <>
      {annotations.map((a) => {
        if (a.kind === 'polyline') {
          return (
            <PolylineAnnotationShape
              key={a.id}
              isEditing={isEditing}
              annotation={a}
              isSelected={a.id === selectedId}
              onSelect={() => onSelect(a.id)}
              onUpdate={onUpdate}
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
              onUpdate={onUpdate}
            />
          );
        }
        return null;
      })}
    </>
  );
};
