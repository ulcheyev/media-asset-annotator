import type {
  ToolContextInterface,
  ToolControllerTimeContext,
  ToolStrategy,
} from './ToolContextInterface';
import type { Point } from '../../../types/geometry';
import type { EditorMutators } from '../../context/editor/EditorContext.types.ts';
import type { Annotation, AnnotationPatch } from '../../../types/intern/annotation.ts';

export class ToolController implements ToolContextInterface {
  private activeTool: ToolStrategy | null = null;
  private readonly mutators: EditorMutators;
  private readonly onFinish: () => void;
  private time: ToolControllerTimeContext = { currentTime: 0, duration: 0 };
  constructor(mutators: EditorMutators, onFinish: () => void) {
    this.mutators = mutators;
    this.onFinish = onFinish;
  }

  /* ---------------- tool lifecycle ---------------- */

  setTool(tool: ToolStrategy | null) {
    if (this.activeTool) {
      this.activeTool.cancel(this);
    }
    this.activeTool = tool;
  }

  onEditingDisabled() {
    this.activeTool?.cancel(this);
    this.activeTool = null;
  }

  /* ---------------- pointer events ---------------- */

  onPointerDown(point: Point) {
    this.activeTool?.onPointerDown(point, this);
  }

  onPointerMove(point: Point) {
    this.activeTool?.onPointerMove(point, this);
  }

  onPointerUp(point: Point) {
    this.activeTool?.onPointerUp(point, this);
    this.onFinish();
  }

  /* ---------------- ToolContextInterface ---------------- */

  createAnnotation(annotation: Annotation) {
    this.mutators.addAnnotation(annotation);
  }

  updateAnnotation(id: string, patch: AnnotationPatch) {
    this.mutators.updateAnnotation(id, patch);
  }

  removeAnnotation(id: string) {
    this.mutators.removeAnnotation(id);
  }

  selectAnnotation(id: string | null) {
    this.mutators.selectAnnotation(id);
  }

  setTimeContext(timeContext: ToolControllerTimeContext): void {
    this.time = timeContext;
  }

  getTimeContext(): ToolControllerTimeContext {
    return this.time;
  }
}
