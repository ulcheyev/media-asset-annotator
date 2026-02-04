import { Constants } from '../../../utils/Constants.ts';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface.ts';
import type { Point } from '../../../types/geometry.ts';

export class FreehandDrawTool implements ToolStrategy {
  private annotationId: string | null = null;
  private points: number[] = [];
  private counter = 0;

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    if (this.annotationId) return;

    const id = crypto.randomUUID();
    this.counter += 1;
    const { currentTime, duration } = ctx.getTimeContext();

    ctx.createAnnotation({
      id,
      kind: 'polyline',
      label: `Polyline ${this.counter}`,
      points: [point.x, point.y],
      time: {
        start: currentTime,
        end: Math.min(currentTime + Constants.ANNOTATION_MIN_DURATION, duration),
      },
      style: {
        color: Constants.POLYLINE_DEFAULT_COLOR,
        opacity: Constants.POLYLINE_DEFAULT_OPACITY,
        fill: Constants.POLYLINE_DEFAULT_FILL,
        strokeWidth: Constants.POLYLINE_DEFAULT_STROKE_WIDTH,
      },
    });

    this.annotationId = id;
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
