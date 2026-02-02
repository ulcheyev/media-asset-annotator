import { Edit, Undo, Redo, Trash2, Save } from 'lucide-react';
import type { JSX } from 'react';

const ICON_SIZE = 20;

export type CommandKey = 'edit' | 'undo' | 'redo' | 'delete' | 'save';

export const COMMAND_ITEMS: ReadonlyArray<{
  key: CommandKey;
  icon: JSX.Element;
}> = [
  { key: 'edit', icon: <Edit size={ICON_SIZE} /> },
  { key: 'undo', icon: <Undo size={ICON_SIZE} /> },
  { key: 'redo', icon: <Redo size={ICON_SIZE} /> },
  { key: 'delete', icon: <Trash2 size={ICON_SIZE} /> },
  { key: 'save', icon: <Save size={ICON_SIZE} /> },
];
