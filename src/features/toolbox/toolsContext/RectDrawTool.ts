import { Constants } from '../../../utils/Constants.ts';
import type { ToolContextInterface, ToolStrategy } from './ToolContextInterface.ts';
import type { Point } from '../../../types/geometry.ts';

export class RectDrawTool implements ToolStrategy {
    private counter = 0;

    onPointerDown(point: Point, ctx: ToolContextInterface) {
        const id = crypto.randomUUID();
        this.counter += 1;

        const { currentTime, duration } = ctx.getTimeContext();

        const halfWidth = Constants.DEFAULT_RECT_WIDTH / 2;
        const halfHeight = Constants.DEFAULT_RECT_HEIGHT / 2;

        const x1 = point.x + halfWidth;
        const y1 = point.y + halfHeight;

        const points = [
            point.x, point.y,
            x1,  point.y,
            x1, y1,
            point.x, y1,
            point.x, point.y,
        ];

        ctx.createAnnotation({
            id,
            kind: 'polyline',
            label: `Rect ${this.counter}`,
            points,
            time: {
                start: currentTime,
                end: Math.min(
                    currentTime + Constants.ANNOTATION_MIN_DURATION,
                    duration
                ),
            },
            style: {
                color: Constants.POLYLINE_DEFAULT_COLOR,
                opacity: Constants.POLYLINE_DEFAULT_OPACITY,
                fill: 'none',
                strokeWidth: Constants.DEFAULT_STROKE_WIDTH_FOR_RECT,
            },
        });

        ctx.selectAnnotation(id);
        ctx.setSelectTool();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPointerMove(_: Point, __: ToolContextInterface) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPointerUp(_: Point, __: ToolContextInterface) {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cancel(_: ToolContextInterface) {}
}
