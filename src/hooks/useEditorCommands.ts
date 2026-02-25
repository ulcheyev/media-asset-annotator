import { useCallback, useRef } from 'react';
import { StateCommandManager } from '../features/toolbox/commands/StateCommandManager.ts';
import type { Command } from '../types/intern/stateCommand.ts';

export function useEditorCommands() {
  const managerRef = useRef(new StateCommandManager());

  const execute = useCallback((command: Command) => {
    managerRef.current.execute(command);
  }, []);

  const undo = useCallback(() => {
    managerRef.current.undo();
  }, []);

  const redo = useCallback(() => {
    managerRef.current.redo();
  }, []);

  return { execute, undo, redo };
}
