import type { Annotation, AnnotationPatch } from '../../../types/intern/annotation.ts';
import type { Point } from '../../../types/geometry.ts';

export type ToolControllerTimeContext = {
  currentTime: number;
  duration: number;
};

export interface ToolContextInterface {
  createAnnotation: (a: Annotation) => void;
  updateAnnotation: (id: string, patch: AnnotationPatch) => void;
  removeAnnotation: (id: string) => void;
  selectAnnotation: (id: string | null) => void;
  setSelectTool(): void;
  setTimeContext: (timeContext: ToolControllerTimeContext) => void;
  getTimeContext: () => ToolControllerTimeContext;
}

export interface ToolStrategy {
  onPointerDown(point: Point, ctx: ToolContextInterface): void;
  onPointerMove(point: Point, ctx: ToolContextInterface): void;
  onPointerUp(point: Point, ctx: ToolContextInterface): void;
  cancel(ctx: ToolContextInterface): void;
}
