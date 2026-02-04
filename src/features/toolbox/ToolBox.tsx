import * as Separator from '@radix-ui/react-separator';
import { useEditor } from '../context/editor/useEditor';

import AnnotationList from './styleControls/AnnotationList';
import StyleControls from './styleControls/StyleControls';
import { Tools } from './tools/Tools';
import type { CommandKey } from './commands/commands.items';
import { Commands } from './commands/Commands';

export const Toolbox = () => {
  const {
    annotations,
    selectedId,
    isEditing,
    activeTool,
    setEditing,
    setActiveTool,
    selectAnnotation,
    updateAnnotation,
      commitAnnotation,
    removeSelected,
    undo,
    redo,
    save,
  } = useEditor();

  const selectedAnnotation = annotations.find((a) => a.id === selectedId) ?? null;

  const handleCommand = (cmd: CommandKey) => {
    switch (cmd) {
      case 'edit':
        setEditing(!isEditing);
        break;
      case 'undo':
        undo();
        break;
      case 'redo':
        redo();
        break;
      case 'delete':
        removeSelected();
        break;
      case 'save':
        save();
        break;
    }
  };

  return (
    <div className="bg-neutral-900 text-white flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-neutral-700">
        <div className="px-4 py-3 font-semibold border-b border-neutral-700 text-center">
          Annotation Toolbox
        </div>

        <div className="border-b border-neutral-700">
          <Commands isEditing={isEditing} onCommand={handleCommand} />
          <Tools activeTool={activeTool} isEditing={isEditing} onToolChange={setActiveTool} />
        </div>
      </div>

      <div className="flex-1 min-h-0 border-b border-neutral-700">
        {selectedAnnotation && isEditing ? (
          <StyleControls
            annotation={selectedAnnotation}
            onChange={(patch) => updateAnnotation(selectedAnnotation.id, patch)}
            onCommit={commitAnnotation}
          />
        ) : (
          <div className="h-full flex items-center justify-center px-4 text-sm text-neutral-500 text-center">
            Enable edit mode and select an annotation to adjust its style.
          </div>
        )}
      </div>

      <Separator.Root className="h-px bg-neutral-700" />

      {/* Annotation list */}
      <div className="shrink-0 h-60">
        <AnnotationList
          annotations={annotations}
          selectedId={selectedId}
          onSelect={selectAnnotation}
        />
      </div>
    </div>
  );
};
