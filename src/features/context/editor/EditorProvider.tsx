import { useEffect, useRef, useState } from 'react';
import { EditorContext } from './EditorContext';
import type { EditorState } from './EditorContext.types';
import { usePlayback } from '../playback/usePlayback';

import type { Annotation, AnnotationPatch } from '../../../types/intern/annotation';
import { Constants } from '../../../utils/Constants';

import { ToolController } from '../../toolbox/toolsContext/ToolController';
import { ToolRegistry } from '../../toolbox/toolsContext/ToolRegistry';
import { exportAsSFormsObject } from '../../../api/exporters/sFormsExporter.ts';
import { useMediaAsset } from '../mediaAsset/useMediaAsset.ts';
import {
  getPolylineAnnotationFromAnnotationData,
  getTextAnnotationFromAnnotationData,
} from '../../../types/mapper/annotationMapper.ts';
import { fetchAnnotations } from '../../../api/fetchAnnotations.ts';
import type { Tool } from '../../toolbox/tools/tools.items.tsx';
import { StateCommandManager } from '../../toolbox/commands/StateCommandManager.ts';
import { UpdateAnnotationCommand } from '../../toolbox/commands/stateCommands/UpdateAnnotationStateCommand.ts';
import { AddAnnotationCommand } from '../../toolbox/commands/stateCommands/AddAnnotationStateCommand.ts';
import { RemoveAnnotationCommand } from '../../toolbox/commands/stateCommands/RemoveAnnotationStateCommand.ts';

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeTool, setActiveTool] = useState<Tool>(Constants.SELECT_TOOL_LABEL as Tool);
  const { asset, layout } = useMediaAsset();
  const { cursor, duration } = usePlayback();

  const addAnnotation = (a: Annotation) => {
    stateCommandsRef.current!.execute(
      new AddAnnotationCommand(
        a,
        (a) => {
          setAnnotations((prev) => [...prev, a]);
        },
        (id) => {
          setAnnotations((prev) => prev.filter((ann) => ann.id !== id));
          setSelectedId((prev) => (prev === id ? null : prev));
        },
      ),
    );
  };

  const commitUpdateAnnotation = (before: Annotation, after: Annotation) => {
    if (!before) return;
    stateCommandsRef.current!.execute(new UpdateAnnotationCommand(before, after, updateAnnotation));
  };

  const updateAnnotation = (id: string, patch: AnnotationPatch) => {
    setAnnotations((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              ...patch,
              style: patch.style ? { ...a.style, ...patch.style } : a.style,
            }
          : a,
      ),
    );
  };

  const removeAnnotation = (id: string) => {
    stateCommandsRef.current!.execute(
      new RemoveAnnotationCommand(
        annotations.find((a) => a.id === id)!,
        (a) => {
          setAnnotations((prev) => [...prev, a]);
          setSelectedId(a.id);
        },
        (id) => {
          setAnnotations((prev) => prev.filter((ann) => ann.id !== id));
          setSelectedId((prev) => (prev === id ? null : prev));
        },
      ),
    );
  };

  const removeSelected = () => {
    if (selectedId) removeAnnotation(selectedId);
  };

  const selectAnnotation = (id: string | null) => {
    setSelectedId(id);
  };

  const save = async (): Promise<void> => {
    if (!asset) {
      throw new Error("Cannot save: media asset is not loaded");
    }

    const result = exportAsSFormsObject(
        asset,
        layout.width,
        layout.height,
        annotations
    );

    console.log(result);
  };


  const undo = () => {
    stateCommandsRef.current!.undo();
  };

  const redo = () => {
    stateCommandsRef.current!.redo();
  };

  const setEditing = (v: boolean) => {
    setIsEditing(v);
    if (!v) setSelectedId(null);
  };

  const toolControllerRef = useRef<ToolController | null>(null);
  const stateCommandsRef = useRef<StateCommandManager>(null);
  const toolRegistryRef = useRef<ToolRegistry | null>(null);

  useEffect(() => {
    if (!asset) return;

    const loadAnnotations = async () => {
      if (!asset || !asset.id) return;
      const data = await fetchAnnotations(asset.id);

      const mapped = data
        .map((a) => {
          switch (a.type) {
            case Constants.TEXT_TYPE_LABEL:
              return getTextAnnotationFromAnnotationData(a, layout.width, layout.height);
            case Constants.POLYLINE_TYPE_LABEL:
              return getPolylineAnnotationFromAnnotationData(a, layout.width, layout.height);
            default:
              return null;
          }
        })
        .filter((a): a is Annotation => a !== null);

      setAnnotations(mapped);
      setSelectedId(null);
      setIsEditing(false);
    };

    loadAnnotations();
  }, [asset]);

  useEffect(() => {
    toolControllerRef.current = new ToolController(
      {
        addAnnotation,
        updateAnnotation,
        commitAnnotation: commitUpdateAnnotation,
        removeAnnotation,
        selectAnnotation,
      },
      setActiveTool,
    );

    toolRegistryRef.current = new ToolRegistry(toolControllerRef.current);
    stateCommandsRef.current = new StateCommandManager();

    return () => {
      toolControllerRef.current?.onEditingDisabled();
      toolControllerRef.current = null;
      toolRegistryRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!toolControllerRef.current || !toolRegistryRef.current) return;

    const tool = toolRegistryRef.current.get(activeTool);
    toolControllerRef.current.setToolStrategy(tool);
  }, [activeTool]);

  useEffect(() => {
    if (!isEditing) {
      toolControllerRef.current!.onEditingDisabled();
    }
  }, [isEditing]);

  useEffect(() => {
    toolControllerRef.current?.setTimeContext({
      currentTime: cursor.t,
      duration,
    });
  }, [cursor.t, duration]);

  const getToolController = () => toolControllerRef.current!;

  const value: EditorState = {
    annotations,
    selectedId,
    isEditing,
    activeTool,

    getToolController,
    setActiveTool,

    setEditing,
    selectAnnotation,

    addAnnotation,
    updateAnnotation,
    commitAnnotation: commitUpdateAnnotation,
    removeAnnotation,
    removeSelected,
    save,
    undo,
    redo,

    setAnnotations,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};
