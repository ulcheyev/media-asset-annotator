import type { Annotation } from '../../types/intern/annotation.ts';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';

interface AnnotationListProps {
  annotations: Annotation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const AnnotationList = ({ annotations, selectedId, onSelect }: AnnotationListProps) => {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className="h-full">
        <div className="p-2 space-y-1">
          {annotations.map((a) => (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              className={clsx(
                'w-full text-left px-3 py-2 rounded text-sm',
                selectedId === a.id && 'bg-neutral-800',
              )}
            >
              {a.label || a.id}
            </button>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
    </ScrollArea.Root>
  );
};

export default AnnotationList;
