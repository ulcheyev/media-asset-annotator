import { useContext } from 'react';
import type { EditorState } from './EditorContext.types';
import { EditorContext } from './EditorContext.ts';

export const useEditor = (): EditorState => {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error('useEditor must be used inside EditorProvider');
  }
  return ctx;
};
