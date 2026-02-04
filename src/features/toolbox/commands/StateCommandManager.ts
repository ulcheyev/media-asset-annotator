import type { Command } from '../../../types/intern/stateCommand.ts';

export class StateCommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  execute(cmd: Command) {
    cmd.do();
    this.undoStack.push(cmd);
    this.redoStack = [];
  }

  undo() {
    const cmd = this.undoStack.pop();
    if (!cmd) return;
    cmd.undo();
    this.redoStack.push(cmd);
  }

  redo() {
    const cmd = this.redoStack.pop();
    if (!cmd) return;
    cmd.do();
    this.undoStack.push(cmd);
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}
