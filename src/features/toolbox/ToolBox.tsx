import * as Separator from '@radix-ui/react-separator';
import { useEditor } from '../context/editor/useEditor';
import AnnotationList from './styleControls/AnnotationList';
import StyleControls from './styleControls/StyleControls';
import { Tools } from './tools/Tools';
import type { CommandKey } from './commands/commands.items';
import { Commands } from './commands/Commands';
import { ErrorSnackbar } from '../snack/ErrorSnackbar.tsx';
import { SuccessSnackbar } from '../snack/SuccessSnackbar.tsx';
import { useSnackbar } from '../snack/useSnackbar.ts';

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

  const { snackbar, showSuccess, showError } = useSnackbar();

  const handleSave = async () => {
    try {
      await save();
      showSuccess('Annotations saved');
    } catch (e) {
      showError(e instanceof Error ? e.message : 'Failed to save annotations');
    }
  };

  const handleCommand = async (cmd: CommandKey) => {
    switch (cmd) {
      case 'edit':
        setEditing(!isEditing);
        return;

      case 'undo':
        undo();
        return;

      case 'redo':
        redo();
        return;

      case 'delete':
        removeSelected();
        return;

      case 'save':
        handleSave();
    }
  };

  return (
    <div className="relative bg-neutral-900 text-white flex flex-col h-full overflow-hidden">
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

      <div className="shrink-0 h-60">
        <AnnotationList
          annotations={annotations}
          selectedId={selectedId}
          onSelect={selectAnnotation}
        />
      </div>

      {snackbar?.type === 'success' && <SuccessSnackbar message={snackbar.message} />}

      {snackbar?.type === 'error' && <ErrorSnackbar message={snackbar.message} />}
    </div>
  );
};
