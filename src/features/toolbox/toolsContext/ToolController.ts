import type {
  ToolContextInterface,
  ToolControllerTimeContext,
  ToolStrategy,
} from './ToolContextInterface';
import type { Point } from '../../../types/geometry';
import type { EditorMutators } from '../../context/editor/EditorContext.types.ts';
import type { Annotation, AnnotationPatch } from '../../../types/intern/annotation.ts';
import type {Tool} from "../tools/tools.items.tsx";
import {Constants} from "../../../utils/Constants.ts";

export class ToolController implements ToolContextInterface {
  private activeToolStrategy: ToolStrategy | null = null;
  private readonly mutators: EditorMutators;
  private readonly setActiveTool: (tool: Tool) => void;
  private time: ToolControllerTimeContext = { currentTime: 0, duration: 0 };
  constructor(mutators: EditorMutators, setActiveTool: (tool: Tool) => void) {
    this.mutators = mutators;
    this.setActiveTool = setActiveTool;
  }
  /* ---------------- tool lifecycle ---------------- */

  setToolStrategy(tool: ToolStrategy | null) {
    if (this.activeToolStrategy) {
      this.activeToolStrategy.cancel(this);
    }
    this.activeToolStrategy = tool;
  }

  onEditingDisabled() {
    this.activeToolStrategy?.cancel(this);
    this.activeToolStrategy = null;
  }

  /* ---------------- pointer events ---------------- */

  onPointerDown(point: Point) {
    this.activeToolStrategy?.onPointerDown(point, this);
  }

  onPointerMove(point: Point) {
    this.activeToolStrategy?.onPointerMove(point, this);
  }

  onPointerUp(point: Point) {
    this.activeToolStrategy?.onPointerUp(point, this);
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

  setSelectTool(): void {
    this.setActiveTool(Constants.SELECT_TOOL_LABEL as Tool);
  }
}
