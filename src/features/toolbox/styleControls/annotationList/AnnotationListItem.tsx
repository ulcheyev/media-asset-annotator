import clsx from 'clsx';
import { VisibilityToggleButton } from './VisibilityToggleButton';
import type {AnnotationView} from '../../../../types/intern/annotation.ts';

interface AnnotationListItemProps {
  annotation: AnnotationView;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onForceVisibility: (id: string, visible: boolean) => void;
}

export const AnnotationListItem = ({
  annotation,
  isSelected,
  onSelect,
                                     onForceVisibility
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
      <span className={clsx('break-all', !annotation.isVisibleNow  && 'opacity-40 line-through')}>
        {annotation.label ?? `${annotation.kind} annotation`}
      </span>

      {/* Visibility */}
      <VisibilityToggleButton
          isVisibleNow={annotation.isVisibleNow}
          onForceVisible={(v) => onForceVisibility(annotation.id, v)}
      />
    </div>
  );
};
