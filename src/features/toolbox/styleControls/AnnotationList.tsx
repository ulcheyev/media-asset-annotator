import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import type { Annotation } from '../../../types/intern/annotation';

interface AnnotationListProps {
    annotations: Annotation[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export const AnnotationList = ({
                                   annotations,
                                   selectedId,
                                   onSelect,
                               }: AnnotationListProps) => {
    const isEmpty = annotations.length === 0;

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* HEADER */}
            <div className="shrink-0 px-4 py-2 text-xs font-semibold text-neutral-400 border-b border-neutral-700">
                Annotations ({annotations.length})
            </div>

            {/* CONTENT */}
            <div className="flex-1 min-h-0">
                {isEmpty ? (
                    /* EMPTY STATE */
                    <div className="h-full flex items-center justify-center px-4 text-sm text-neutral-500 text-center">
                        No annotations yet.<br />
                        Enable edit mode and draw on the media.
                    </div>
                ) : (
                    /* SCROLLABLE LIST */
                    <ScrollArea.Root className="h-full">
                        <ScrollArea.Viewport className="h-full">
                            <div className="p-2 space-y-1">
                                {annotations.map((a) => (
                                    <button
                                        key={a.id}
                                        onClick={() => onSelect(a.id)}
                                        className={clsx(
                                            'w-full text-left px-3 py-2 rounded text-sm',
                                            'hover:bg-neutral-800',
                                            selectedId === a.id && 'bg-neutral-800',
                                        )}
                                    >
                                        {a.label || a.id}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea.Viewport>

                        {/* SCROLLBAR */}
                        <ScrollArea.Scrollbar
                            orientation="vertical"
                            className="
                flex w-2
                bg-neutral-900
                hover:bg-neutral-800
                transition-colors
              "
                        >
                            <ScrollArea.Thumb
                                className="
                  flex-1
                  bg-neutral-600
                  rounded-full
                  min-h-[20px]
                  hover:bg-neutral-500
                "
                            />
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                )}
            </div>
        </div>
    );
};

export default AnnotationList;
