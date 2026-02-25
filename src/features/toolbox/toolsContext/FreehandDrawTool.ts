import { Constants } from '../../../utils/Constants.ts';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface.ts';
import type { Point } from '../../../types/geometry.ts';
import { AbstractDrawTool } from './AbstractDrawTool.ts';
import { AnnotationFactory } from './AnnotationFactory.ts';

export class FreehandDrawTool extends AbstractDrawTool implements ToolStrategy {
  private annotationId: string | null = null;
  private points: number[] = [];

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    if (this.annotationId) return;

    const base = AnnotationFactory.createBase(ctx, this.nextLabel('Polyline'));

    ctx.createAnnotation({
      ...base,
      kind: 'polyline',
      points: [point.x, point.y],
      style: {
        color: Constants.POLYLINE_DEFAULT_COLOR,
        opacity: Constants.POLYLINE_DEFAULT_OPACITY,
        fill: Constants.POLYLINE_DEFAULT_FILL,
        strokeWidth: Constants.POLYLINE_DEFAULT_STROKE_WIDTH,
      },
    });

    this.annotationId = base.id;
    this.points = [point.x, point.y];
  }

  onPointerMove(point: Point, ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    this.points.push(point.x, point.y);

    ctx.updateAnnotation(this.annotationId, {
      points: [...this.points],
    });
  }

  onPointerUp(_: Point, ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    ctx.selectAnnotation(this.annotationId);
    ctx.setSelectTool();
    this.reset();
  }

  cancel(ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    ctx.removeAnnotation(this.annotationId);
    this.reset();
  }

  private reset() {
    this.annotationId = null;
    this.points = [];
  }
}
