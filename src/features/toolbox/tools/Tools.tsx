import clsx from 'clsx';
import { TOOL_ITEMS, type Tool } from './tools.items.tsx';

interface ToolsProps {
  activeTool: Tool;
  isEditing: boolean;
  onToolChange: (tool: Tool) => void;
}

export const Tools = ({ activeTool, isEditing, onToolChange }: ToolsProps) => {
  return (
    <div className="p-2 flex justify-around">
      {TOOL_ITEMS.map(({ tool, icon }) => (
        <ToolButton
          key={tool}
          active={isEditing && activeTool === tool}
          disabled={!isEditing}
          onClick={() => onToolChange(tool)}
        >
          {icon}
        </ToolButton>
      ))}
    </div>
  );
};

interface ToolButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolButton = ({ active, disabled, onClick, children }: ToolButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      'p-2 rounded-md',
      'hover:bg-neutral-700',
      active && 'bg-neutral-700',
      disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent',
    )}
  >
    {children}
  </button>
);
