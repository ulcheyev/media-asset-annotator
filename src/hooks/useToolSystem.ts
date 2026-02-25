import { useEffect, useRef } from "react";
import { ToolController } from "../features/toolbox/toolsContext/ToolController";
import { ToolRegistry } from "../features/toolbox/toolsContext/ToolRegistry";
import type { Tool } from "../features/toolbox/tools/tools.items";
import type {Annotation, AnnotationPatch} from "../types/intern/annotation.ts";

interface ToolSystemConfig {
    addAnnotation: (annotation: Annotation) => void;
    updateAnnotation: (id: string, patch: AnnotationPatch) => void;
    commitAnnotation: (before: Annotation, after: Annotation) => void;
    removeAnnotation: (id: string) => void;
    selectAnnotation: (id: string | null) => void;
    setActiveTool: (tool: Tool) => void;
    activeTool: Tool;
    isEditing: boolean;
    currentTime: number;
    duration: number;
}

export function useToolSystem(config: ToolSystemConfig) {
    const controllerRef = useRef<ToolController | null>(null);
    const registryRef = useRef<ToolRegistry | null>(null);


    // mounted once.
    useEffect(() => {
        controllerRef.current = new ToolController(
            {
                addAnnotation: config.addAnnotation,
                updateAnnotation: config.updateAnnotation,
                commitAnnotation: config.commitAnnotation,
                removeAnnotation: config.removeAnnotation,
                selectAnnotation: config.selectAnnotation,
            },
            config.setActiveTool
        );

        registryRef.current = new ToolRegistry(controllerRef.current);

        return () => {
            controllerRef.current?.onEditingDisabled();
            controllerRef.current = null;
            registryRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!controllerRef.current || !registryRef.current) return;
        const tool = registryRef.current.get(config.activeTool);
        controllerRef.current.setToolStrategy(tool);
    }, [config.activeTool]);

    useEffect(() => {
        if (!config.isEditing) {
            controllerRef.current?.onEditingDisabled();
        }
    }, [config.isEditing]);

    useEffect(() => {
        controllerRef.current?.setTimeContext({
            currentTime: config.currentTime,
            duration: config.duration,
        });
    }, [config.currentTime, config.duration]);

    return {
        getToolController: () => controllerRef.current!,
    };
}