import * as Separator from '@radix-ui/react-separator';
import type {Annotation, AnnotationPatch} from '../../types/intern/annotation';

import AnnotationList from './AnnotationList';
import StyleControls from './StyleControls';
import { Commands, type CommandKey } from './Commands';
import { Tools, type Tool } from './Tools';

interface ToolboxProps {
    isEditing: boolean;

    activeTool: Tool;
    annotations: Annotation[];
    selectedAnnotationId: string | null;

    onToggleEdit: () => void;
    onToolChange: (tool: Tool) => void;
    onSelectAnnotation: (id: string) => void;
    onUpdateAnnotationStyle: (
        id: string,
        patch: AnnotationPatch,
    ) => void;

    onUndo: () => void;
    onRedo: () => void;
    onDelete: () => void;
    onSave: () => void;
}

export const Toolbox = ({
                            isEditing,
                            activeTool,
                            annotations,
                            selectedAnnotationId,
                            onToggleEdit,
                            onToolChange,
                            onSelectAnnotation,
                            onUpdateAnnotationStyle,
                            onUndo,
                            onRedo,
                            onDelete,
                            onSave,
                        }: ToolboxProps) => {
    const selectedAnnotation = annotations.find(
        (a) => a.id === selectedAnnotationId,
    );

    const handleCommand = (cmd: CommandKey) => {
        switch (cmd) {
            case 'edit':
                onToggleEdit();
                break;
            case 'undo':
                onUndo();
                break;
            case 'redo':
                onRedo();
                break;
            case 'delete':
                onDelete();
                break;
            case 'save':
                onSave();
                break;
        }
    };

    return (
        <div className="bg-neutral-900 text-white flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 font-semibold border-b border-neutral-700 text-center">
                Annotation Toolbox
            </div>

            <div className="flex-0 border-b border-neutral-700">
                <Commands isEditing={isEditing} onCommand={handleCommand} />
                <Tools
                    activeTool={activeTool}
                    isEditing={isEditing}
                    onToolChange={onToolChange}
                />
            </div>

            <div className={"flex-2"}>
                {selectedAnnotation && isEditing ? (
                    <StyleControls
                        annotation={selectedAnnotation}
                        onChange={(style) =>
                            onUpdateAnnotationStyle(selectedAnnotation.id, style)
                        }
                    />
                ) : (
                    <div className="px-4 py-3 text-neutral-500 text text-center">
                        Enable edit mode and select an annotation to adjust its style.
                    </div>
                )}
            </div>


            <Separator.Root className="h-px bg-neutral-700" />
            <div className={"flex-1"}>
                <AnnotationList
                    annotations={annotations}
                    selectedId={selectedAnnotationId}
                    onSelect={onSelectAnnotation}
                />
            </div>

        </div>
    );
};
