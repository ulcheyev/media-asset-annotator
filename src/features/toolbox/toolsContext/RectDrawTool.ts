import { Constants } from '../../../utils/Constants.ts';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface.ts';
import type { Point } from '../../../types/geometry.ts';
import { AnnotationFactory } from './AnnotationFactory.ts';
import { AbstractDrawTool } from './AbstractDrawTool.ts';

export class RectDrawTool extends AbstractDrawTool implements ToolStrategy {
  onPointerDown(point: Point, ctx: ToolContextInterface) {
    const base = AnnotationFactory.createBase(ctx, this.nextLabel('Rect'));

    const halfWidth = Constants.DEFAULT_RECT_WIDTH / 2;
    const halfHeight = Constants.DEFAULT_RECT_HEIGHT / 2;

    const x1 = point.x + halfWidth;
    const y1 = point.y + halfHeight;

    const points = [point.x, point.y, x1, point.y, x1, y1, point.x, y1, point.x, point.y];

    ctx.createAnnotation({
      ...base,
      kind: 'polyline',
      points,
      style: {
        color: Constants.POLYLINE_DEFAULT_COLOR,
        opacity: Constants.POLYLINE_DEFAULT_OPACITY,
        fill: 'none',
        strokeWidth: Constants.DEFAULT_STROKE_WIDTH_FOR_RECT,
      },
    });

    ctx.selectAnnotation(base.id);
    ctx.setSelectTool();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerMove(_: Point, __: ToolContextInterface) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerUp(_: Point, __: ToolContextInterface) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cancel(_: ToolContextInterface) {}
}
