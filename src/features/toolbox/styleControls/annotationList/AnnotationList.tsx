import * as ScrollArea from '@radix-ui/react-scroll-area';
import { AnnotationListItem } from './AnnotationListItem';
import type {Annotation, AnnotationPatch, AnnotationView} from '../../../../types/intern/annotation.ts';
import {isAnnotationVisible} from "../../../../utils/mediaAsset.utils.ts";
import clsx from "clsx";
import {Unlock, Lock} from "lucide-react";

interface AnnotationListProps {
    annotations: Annotation[];
    currentTime: number;
    selectedId: string | null;
    onSelect: (id: string) => void;
    updateAnnotation: (id: string, patch: AnnotationPatch) => void;
    isLocked: boolean;
    onToggleLock: () => void;
}

export const AnnotationList = ({
  annotations,
    currentTime,
  selectedId,
  onSelect,
                                   updateAnnotation,
                                   isLocked,
                                   onToggleLock,
}: AnnotationListProps) => {

    const currentAnnotations: AnnotationView[] = annotations.map((a) => ({
        ...a,
        isVisibleNow: isAnnotationVisible(a, currentTime)
    }));

    const isEmpty = annotations.length === 0;

    const onForceVisibility = (id: string, visible: boolean) => {
        updateAnnotation(id, {
            visibilityMode: { type: 'force', value: visible },
        });
    };

  return (
      <div className="flex flex-col h-full min-h-0">
          <div className="shrink-0 px-5 py-2 border-b border-neutral-700 flex items-center justify-between">
  <span className="text-xs font-semibold text-neutral-400">
    Annotations ({annotations.length})
  </span>

              <button
                  type="button"
                  onClick={(e) => {
                      onToggleLock();
                      e.stopPropagation();
                  }}
                  className={clsx(
                      'p-1 rounded transition-colors',
                      'hover:bg-neutral-700',
                      !isLocked
                          ? 'text-green-500 hover:text-green-400'
                          : 'text-red-500 hover:text-red-400'
                  )}
                  title={isLocked ? 'Unlock current view' : 'Lock current view'}
              >
                  {isLocked ? <Lock size={24}/> : <Unlock size={24}/>}
              </button>
          </div>

          <div className="flex-1 min-h-0">
              {isEmpty ? (
                  <div className="h-full flex items-center justify-center px-4 text-sm text-neutral-500 text-center">
                      No annotations yet.
                      <br/>
                      Enable edit mode and draw on the media.
                  </div>
              ) : (
                  <ScrollArea.Root className="h-full">
                      <ScrollArea.Viewport className="h-full">
                          <div className="p-2 space-y-1">
                              {currentAnnotations.map((annotation) => (
                                  <AnnotationListItem
                                      key={annotation.id}
                                      annotation={annotation}
                                      isSelected={selectedId === annotation.id}
                                      onSelect={onSelect}
                                      onForceVisibility={onForceVisibility}
                                  />
                              ))}
                          </div>
                      </ScrollArea.Viewport>

                      <ScrollArea.Scrollbar
                          orientation="vertical"
                          className="flex w-2 bg-neutral-900 hover:bg-neutral-800 transition-colors"
                      >
                          <ScrollArea.Thumb
                              className="flex-1 bg-neutral-600 rounded-full min-h-[20px] hover:bg-neutral-500"/>
                      </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
              )}
          </div>
      </div>
  );
};

export default AnnotationList;
