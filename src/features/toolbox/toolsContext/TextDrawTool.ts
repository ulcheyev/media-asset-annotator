import { Constants } from '../../../utils/Constants';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface';
import type { Point } from '../../../types/geometry';
import { AbstractDrawTool } from './AbstractDrawTool.ts';
import { AnnotationFactory } from './AnnotationFactory.ts';

export class TextDrawTool extends AbstractDrawTool implements ToolStrategy {
  private annotationId: string | null = null;

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    const base = AnnotationFactory.createBase(ctx, this.nextLabel('Text'));

    ctx.createAnnotation({
      ...base,
      kind: 'text',
      text: base.label,
      x: point.x,
      y: point.y,
      fontSize: Constants.TEXT_DEFAULT_FONT_SIZE,
      fontWeight: Constants.TEXT_DEFAULT_FONT_WEIGHT,
      style: {
        strokeWidth: Constants.TEXT_DEFAULT_STROKE_WIDTH,
        fill: Constants.TEXT_DEFAULT_FILL,
        color: Constants.TEXT_DEFAULT_COLOR,
        opacity: Constants.TEXT_DEFAULT_OPACITY,
      },
    });

    ctx.selectAnnotation(base.id);
    ctx.setSelectTool();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerMove(_: Point) {
    // no-op
  }

  onPointerUp(_: Point, ctx: ToolContextInterface) {
    ctx.setSelectTool();
  }

  cancel(ctx: ToolContextInterface) {
    if (!this.annotationId) return;
    ctx.removeAnnotation(this.annotationId);
    this.reset();
  }

  private reset() {
    this.annotationId = null;
  }
}
