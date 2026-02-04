import type { Command } from '../../../../types/intern/stateCommand.ts';
import type { Annotation } from '../../../../types/intern/annotation.ts';

export class RemoveAnnotationCommand implements Command {
  private annotation: Annotation;

  private add: (a: Annotation) => void;

  private remove: (id: string) => void;

  private select?: (id: string | null) => void;

  constructor(
    annotation: Annotation,
    add: (a: Annotation) => void,
    remove: (id: string) => void,
    select?: (id: string | null) => void,
  ) {
    this.select = select;
    this.remove = remove;
    this.add = add;
    this.annotation = annotation;
  }

  do() {
    this.remove(this.annotation.id);
    this.select?.(null);
  }

  undo() {
    this.add(this.annotation);
    this.select?.(this.annotation.id);
  }
}
