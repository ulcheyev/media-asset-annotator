import { Constants } from '../../../utils/Constants';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface';
import type { Point } from '../../../types/geometry';
import { AbstractDrawTool } from './AbstractDrawTool';
import {AnnotationFactory} from "./AnnotationFactory.ts";

export class PolygonDrawTool
    extends AbstractDrawTool
    implements ToolStrategy
{
  private annotationId: string | null = null;
  private points: number[] = [];

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    // Start new polygon
    if (!this.annotationId) {
      const base = AnnotationFactory.createBase(
          ctx,
          this.nextLabel('Polygon')
      );

      ctx.createAnnotation({
        ...base,
        kind: 'polyline',
        points: [point.x, point.y],
        style: {
          color: Constants.POLYGON_DEFAULT_COLOR,
          opacity: Constants.POLYGON_DEFAULT_OPACITY,
          fill: 'none',
          strokeWidth: Constants.POLYGON_DEFAULT_STROKE_WIDTH,
        },
      });

      this.annotationId = base.id;
      this.points = [point.x, point.y];
      return;
    }

    // Close polygon
    if (this.isClosingPoint(point)) {
      this.finishPolygon(ctx);
      return;
    }

    // Add vertex
    this.points.push(point.x, point.y);

    ctx.updateAnnotation(this.annotationId, {
      points: this.points,
    });
  }

  onPointerMove(point: Point, ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    ctx.updateAnnotation(this.annotationId, {
      points: [...this.points, point.x, point.y],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerUp(_: Point, __: ToolContextInterface) {
    // no-op
  }

  cancel(ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    ctx.removeAnnotation(this.annotationId);
    this.reset();
  }

  private finishPolygon(ctx: ToolContextInterface) {
    if (!this.annotationId) return;

    // Minimum 3 vertices (6 numbers)
    if (this.points.length < 6) {
      ctx.removeAnnotation(this.annotationId);
      this.reset();
      return;
    }

    // Explicitly close polygon
    const closedPoints = [
      ...this.points,
      this.points[0],
      this.points[1],
    ];

    ctx.updateAnnotation(this.annotationId, {
      points: closedPoints,
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

    const dx = point.x - this.points[0];
    const dy = point.y - this.points[1];

    const threshold =
        Constants.POLYGON_CLOSE_DISTANCE *
        Constants.POLYGON_CLOSE_DISTANCE;

    return dx * dx + dy * dy < threshold;
  }

  private reset() {
    this.annotationId = null;
    this.points = [];
  }
}