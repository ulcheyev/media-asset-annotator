import { Constants } from '../../../utils/Constants.ts';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface.ts';
import type { Point } from '../../../types/geometry.ts';

export class PolygonDrawTool implements ToolStrategy {
  private annotationId: string | null = null;
  private points: number[] = [];
  private counter = 0;

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    if (!this.annotationId) {
      const id = crypto.randomUUID();
      this.counter += 1;

      const { currentTime, duration } = ctx.getTimeContext();

      ctx.createAnnotation({
        id,
        kind: 'polyline',
        label: `Polygon ${this.counter}`,
        points: [point.x, point.y],
        time: {
          start: currentTime,
          end: Math.min(currentTime + Constants.ANNOTATION_MIN_DURATION, duration),
        },
        style: {
          color: Constants.POLYGON_DEFAULT_COLOR,
          opacity: Constants.POLYGON_DEFAULT_OPACITY,
          fill: 'none',
          strokeWidth: Constants.POLYGON_DEFAULT_STROKE_WIDTH,
        },
      });

      this.annotationId = id;
      this.points = [point.x, point.y];
      return;
    }

    if (this.isClosingPoint(point)) {
      this.finishPolygon(ctx);
      return;
    }

    this.points.push(point.x, point.y);

    ctx.updateAnnotation(this.annotationId, {
      points: [...this.points],
    });
  }

  onPointerMove(point: Point, ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    ctx.updateAnnotation(this.annotationId, {
      // last segment is a temporary straight preview
      points: [...this.points, point.x, point.y],
    });
  }


// eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerUp(_: Point, __: ToolContextInterface) {
  }

  cancel(ctx: ToolContextInterface) {
    if (!this.annotationId) return;
    ctx.removeAnnotation(this.annotationId);
    this.reset();
  }

  private finishPolygon(ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    if (this.points.length < 6) {
      ctx.removeAnnotation(this.annotationId);
      this.reset();
      return;
    }

    ctx.updateAnnotation(this.annotationId, {
      points: [...this.points],
      style: {
        fill: Constants.POLYGON_DEFAULT_FILL,
      },
    });

    ctx.selectAnnotation(this.annotationId);
    ctx.setSelectTool();
    this.reset();
  }

  private isClosingPoint(point: Point): boolean {
    if (this.points.length < 6) return false;

    const x0 = this.points[0];
    const y0 = this.points[1];

    const dx = point.x - x0;
    const dy = point.y - y0;

    return Math.sqrt(dx * dx + dy * dy) < Constants.POLYGON_CLOSE_DISTANCE;
  }

  private reset() {
    this.annotationId = null;
    this.points = [];
  }
}
