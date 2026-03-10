import type { ToolContextInterface } from './ToolContextInterface.ts';
import { Constants } from '../../../utils/Constants.ts';
import { generateUUID } from '../../../utils/base.utils.ts';

export class AnnotationFactory {
  static createBase(ctx: ToolContextInterface, label: string) {
    const id = generateUUID();
    const { currentTime, duration } = ctx.getTimeContext();

    return {
      id,
      visible: true,
      label,
      time: {
        start: currentTime,
        end: Math.min(currentTime + Constants.ANNOTATION_DEFAULT_DURATION, duration),
      },
    };
  }
}
