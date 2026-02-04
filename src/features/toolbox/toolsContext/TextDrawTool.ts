import { Constants } from '../../../utils/Constants';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface';
import type { Point } from '../../../types/geometry';

export class TextDrawTool implements ToolStrategy {
  private annotationId: string | null = null;
  private counter = 0;

  onPointerDown(point: Point, ctx: ToolContextInterface) {
    if (this.annotationId) return;

    const id = crypto.randomUUID();
    this.counter += 1;

    const { currentTime, duration } = ctx.getTimeContext();

    ctx.createAnnotation({
      id,
      kind: 'text',
      label: `Text ${this.counter}`,
      text: `Text ${this.counter}`,
      x: point.x,
      y: point.y,
      time: {
        start: currentTime,
        end: Math.min(currentTime + Constants.ANNOTATION_MIN_DURATION, duration),
      },
      fontSize: Constants.TEXT_DEFAULT_FONT_SIZE,
      fontWeight: Constants.TEXT_DEFAULT_FONT_WEIGHT,
      style: {
        strokeWidth: Constants.TEXT_DEFAULT_STROKE_WIDTH,
        fill: Constants.TEXT_DEFAULT_FILL,
        color: Constants.TEXT_DEFAULT_COLOR,
        opacity: Constants.TEXT_DEFAULT_OPACITY,
      },
    });

    this.annotationId = id;
    ctx.selectAnnotation(id);
    this.reset();
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
