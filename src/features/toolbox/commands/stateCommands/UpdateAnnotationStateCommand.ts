import type { Command } from '../../../../types/intern/stateCommand.ts';
import type { Annotation } from '../../../../types/intern/annotation.ts';

export class UpdateAnnotationCommand implements Command {
  private before: Annotation;

  private after: Annotation;

  private update: (id: string, a: Annotation) => void;

  constructor(before: Annotation, after: Annotation, update: (id: string, a: Annotation) => void) {
    this.update = update;
    this.after = after;
    this.before = before;
  }

  do() {
    this.update(this.after.id, this.after);
  }

  undo() {
    this.update(this.before.id, this.before);
  }
}
