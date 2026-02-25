import { createContext } from 'react';
import type { EditorState } from './EditorContext.types.ts';

export const EditorContext = createContext<EditorState | null>(null);
