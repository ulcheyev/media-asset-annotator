import clsx from 'clsx';
import {MousePointer, Type, Square, Edit3, Save, LineSquiggle} from 'lucide-react';
import { Constants } from '../../utils/Constants.ts';

export type Tool =
  | typeof Constants.SELECT_TOOL_LABEL
  | typeof Constants.POLYLINE_TYPE_LABEL
  | typeof Constants.TEXT_TYPE_LABEL
  | typeof Constants.RECT_TYPE_TOOL_LABEL
  | typeof Constants.EDIT_BUTTON_TOOL_LABEL;

// TODO
//  Video, image from kovna. Neni potreba video js.
//  rect tool
// toaster on save/error
//  save button,
//  edit button,
//  pencil when drawing,
//  text is not rotatable,
//  resize of polyline
//  opacity and stroke width polzunok
// select on click
// stop when drag from bounds
//  label
// click and resize text
//  list of annotations that are on canvas
//  color
//  undo/redo
//  delete
// annotation rerenders on resize -fix
// edit button -> then open. Edit to exit edit.
// time interval selection

interface ToolboxProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onSave: () => void;
}

export const Toolbox = ({ activeTool, onToolChange, onSave }: ToolboxProps) => {
  return (
    <div
      className="
                flex flex-col gap-2 p-3
                bg-neutral-800
                border-l border-neutral-700
                w-14
            "
    >

      <ToolButton
          active={activeTool === Constants.EDIT_BUTTON_TOOL_LABEL}
          onClick={() => onToolChange(Constants.EDIT_BUTTON_TOOL_LABEL as Tool)}
          title="Edit"
      >
        <Edit3 size={18}/>
      </ToolButton>

      <ToolButton
        active={activeTool === Constants.SELECT_TOOL_LABEL}
        onClick={() => onToolChange(Constants.SELECT_TOOL_LABEL as Tool)}
        title="Select"
      >
        <MousePointer size={18} />
      </ToolButton>

      <ToolButton
        active={activeTool === Constants.POLYLINE_TYPE_LABEL}
        onClick={() => onToolChange(Constants.POLYLINE_TYPE_LABEL as Tool)}
        title="Polyline"
      >
        <LineSquiggle size={18} />
      </ToolButton>

      <ToolButton
        active={activeTool === Constants.RECT_TYPE_TOOL_LABEL}
        onClick={() => onToolChange(Constants.RECT_TYPE_TOOL_LABEL as Tool)}
        title="Rectangle"
      >
        <Square size={18} />
      </ToolButton>

      <ToolButton
        active={activeTool === Constants.TEXT_TYPE_LABEL}
        onClick={() => onToolChange(Constants.TEXT_TYPE_LABEL as Tool)}
        title="Text"
      >
        <Type size={18} />
      </ToolButton>



      <div className="flex-1" />

      <ToolButton active={false} onClick={onSave} title="Save">
        <Save size={18} />
      </ToolButton>
    </div>
  );
};

interface ToolButtonProps {
  active: boolean;
  onClick: () => void;
  title?: string;
  children: React.ReactNode;
}

const ToolButton = ({ active, onClick, title, children }: ToolButtonProps) => (
  <button
    title={title}
    onClick={onClick}
    className={clsx(
      'p-2 rounded-md text-white',
      'hover:bg-neutral-700',
      active && 'bg-neutral-700',
    )}
  >
    {children}
  </button>
);
