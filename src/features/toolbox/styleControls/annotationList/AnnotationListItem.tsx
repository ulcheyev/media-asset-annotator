import clsx from 'clsx';
import { VisibilityToggleButton } from './VisibilityToggleButton';
import type { Annotation } from '../../../../types/intern/annotation.ts';

interface AnnotationListItemProps {
  annotation: Annotation;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export const AnnotationListItem = ({
  annotation,
  isSelected,
  onSelect,
  onToggleVisibility,
}: AnnotationListItemProps) => {
  return (
    <div
      onClick={() => onSelect(annotation.id)}
      className={clsx(
        'flex items-center justify-between',
        'px-3 py-2 rounded text-sm cursor-pointer',
        'hover:bg-neutral-800',
        isSelected && 'bg-neutral-800',
      )}
    >
      {/* Label */}
      <span className={clsx('break-all', !annotation.visible && 'opacity-40 line-through')}>
        {annotation.label ?? `${annotation.kind} annotation`}
      </span>

      {/* Visibility */}
      <VisibilityToggleButton
        visible={annotation.visible}
        onToggle={() => onToggleVisibility(annotation.id)}
      />
    </div>
  );
};
