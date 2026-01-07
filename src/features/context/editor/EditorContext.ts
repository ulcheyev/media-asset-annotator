import { createContext } from 'react';
import type { EditorState } from './EditorContext.types';

export const EditorContext = createContext<EditorState | null>(null);
