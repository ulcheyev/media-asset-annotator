import type {ToolController} from '../../toolbox/toolsContext/ToolController';
import type {Annotation, AnnotationPatch} from "../../../types/intern/annotation.ts";
import type {Tool} from "../../toolbox/tools/tools.items.tsx";


export interface EditorState extends EditorMutators {
    /* state */
    annotations: Annotation[];
    selectedId: string | null;
    isEditing: boolean;
    activeTool: Tool;

    /* tools */
    getToolController: () => ToolController;
    setActiveTool: (tool: Tool) => void;

    /* editor UI actions */
    setEditing: (v: boolean) => void;
    removeSelected: () => void;
    save: () => void;
    undo: () => void;
    redo: () => void;

    /* escape hatch (intentional) */
    setAnnotations: React.Dispatch<React.SetStateAction<Annotation[]>>;
}


export interface EditorMutators {
    addAnnotation: (a: Annotation) => void;
    updateAnnotation: (id: string, patch: AnnotationPatch) => void;
    removeAnnotation: (id: string) => void;
    selectAnnotation: (id: string | null) => void;
}