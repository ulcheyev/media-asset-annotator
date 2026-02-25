import {useCallback, useEffect, useMemo, useState} from 'react';
import { EditorContext } from './EditorContext.ts';
import type { EditorState } from './EditorContext.types.ts';
import {usePlaybackInternal} from '../playback/usePlayback.ts';

import type { Annotation } from '../../types/intern/annotation.ts';
import { Constants } from '../../utils/Constants.ts';

import { useMediaAsset } from '../mediaAsset/useMediaAsset.ts';
import type { Tool } from '../../features/toolbox/tools/tools.items.tsx';
import { UpdateAnnotationCommand } from '../../features/toolbox/commands/stateCommands/UpdateAnnotationStateCommand.ts';
import { AddAnnotationCommand } from '../../features/toolbox/commands/stateCommands/AddAnnotationStateCommand.ts';
import { RemoveAnnotationCommand } from '../../features/toolbox/commands/stateCommands/RemoveAnnotationStateCommand.ts';
import { exportAsSFormsObject } from '../../api/exporters/sFormsExporter.ts';
import {useEditorAnnotations} from "../../hooks/useEditorAnnotations.ts";
import {useEditorCommands} from "../../hooks/useEditorCommands.ts";
import {useToolSystem} from "../../hooks/useToolSystem.ts";

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>(Constants.SELECT_TOOL_LABEL as Tool);
  const { asset, layout } = useMediaAsset();
  const { cursor, duration, setTimeInternal } = usePlaybackInternal();
  const {
    annotations,
    setAnnotations,
    add,
    remove,
    update,
    save,
    freezeCurrentVisibility,
    restoreAutoVisibility,
    forceVisibility,
    syncVisibilityOnTimeChange
  } = useEditorAnnotations(asset, layout);
  const { execute, undo, redo } = useEditorCommands();


  const addAnnotation = useCallback((a: Annotation) => {
   execute(
        new AddAnnotationCommand(
            a,
            (a) => add(a),
            (id) => {
              remove(id);
              setSelectedId(prev => (prev === id ? null : prev));
            },
        ),
    );
  }, [execute, add, remove]);

  const commitUpdateAnnotation = useCallback(
      (before: Annotation, after: Annotation) => {
        if (!before) return;
        execute(
            new UpdateAnnotationCommand(before, after, update)
        );
      },
      [execute, update]
  );


  const removeAnnotation = useCallback((id: string) => {
    const annotation = annotations.find(a => a.id === id);
    if (!annotation) return;

    execute(
        new RemoveAnnotationCommand(
            annotation,
            (a) => {
              add(a);
              setSelectedId(a.id);
            },
            (id) => {
              remove(id);
              setSelectedId(prev => (prev === id ? null : prev));
            },
        ),
    );
  }, [execute, annotations, add, remove]);

  const removeSelected = useCallback(() => {
    if (selectedId) {
      removeAnnotation(selectedId);
    }
  }, [selectedId, removeAnnotation]);

  const selectAnnotation = (id: string | null) => {
    setSelectedId(id);
  };

  const saveAnnotations = useCallback(async (): Promise<void> => {
    if (asset && layout) {
      const result = exportAsSFormsObject(
          asset,
          layout.width,
          layout.height,
          annotations
      );
      console.log(result);
    }

    await save();
    console.log('Annotations saved successfully');
  }, [asset, layout, annotations, save]);

  const undoProvider = useCallback(() => {
    undo();
  }, [undo]);

  const redoProvider = useCallback(() => {
    redo();
  }, [redo]);

  const setEditing = (v: boolean) => {
    setIsEditing(v);
    if (!v) setSelectedId(null);
  };


  const handleSetTime = useCallback(
      (t: number) => {
        setTimeInternal(t);
      },
      [setTimeInternal]
  );


  const { getToolController } = useToolSystem({
    addAnnotation,
    updateAnnotation: update,
    commitAnnotation: commitUpdateAnnotation,
    removeAnnotation,
    selectAnnotation,
    setActiveTool,
    activeTool,
    isEditing,
    currentTime: cursor.t,
    duration,
  });

  useEffect(() => {
    syncVisibilityOnTimeChange(cursor.t, isLocked);
  }, [cursor.t, isLocked]);


  const value = useMemo<EditorState>(() => ({
    annotations,
    selectedId,
    isEditing,
    isLocked,
    activeTool,

    getToolController,
    setActiveTool,
    setTime: handleSetTime,

    setEditing,
    setIsLocked,
    selectAnnotation,

    addAnnotation,
    updateAnnotation: update,
    commitAnnotation: commitUpdateAnnotation,
    removeAnnotation,
    removeSelected,
    save: saveAnnotations,
    undo: undoProvider,
    redo: redoProvider,

    freezeCurrentVisibility,
    restoreAutoVisibility,
    forceVisibility,

  }), [
    annotations,
    selectedId,
    isEditing,
    isLocked,
    activeTool,
    handleSetTime,
    addAnnotation,
    update,
    commitUpdateAnnotation,
    removeAnnotation,
    removeSelected,
    saveAnnotations,
    undo,
    redo,
    freezeCurrentVisibility,
    restoreAutoVisibility,
    forceVisibility,
    setAnnotations,
      undoProvider,
      redoProvider,
      getToolController
  ]);
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};
