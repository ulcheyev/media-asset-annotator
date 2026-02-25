import type { ToolController } from '../../features/toolbox/toolsContext/ToolController.ts';
import type { Annotation, AnnotationPatch } from '../../types/intern/annotation.ts';
import type { Tool } from '../../features/toolbox/tools/tools.items.tsx';

export interface EditorState extends EditorMutators {
  /* state */
  annotations: Annotation[];
  selectedId: string | null;
  isEditing: boolean;
  activeTool: Tool;
  isLocked: boolean

  /* playback integration */
  setTime: (t: number) => void;

  /* tools */
  getToolController: () => ToolController;
  setActiveTool: (tool: Tool) => void;

  /* visibility control */
  freezeCurrentVisibility: (time: number) => void;
  restoreAutoVisibility: () => void;
  forceVisibility: (id: string, visible: boolean) => void;

  /* editor UI actions */
  setEditing: (v: boolean) => void;
  setIsLocked: (v: boolean) => void;
  removeSelected: () => void;
  save: () => Promise<void>;
  undo: () => void;
  redo: () => void;
}

export interface EditorMutators {
  addAnnotation: (a: Annotation) => void;
  updateAnnotation: (id: string, patch: AnnotationPatch) => void;
  commitAnnotation: (before: Annotation, after: Annotation) => void;
  removeAnnotation: (id: string) => void;
  selectAnnotation: (id: string | null) => void;
}
