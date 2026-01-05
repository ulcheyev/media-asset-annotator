import clsx from 'clsx';
import {
    MousePointer,
    LineSquiggle,
    Square,
    Type,
    VectorSquare,
} from 'lucide-react';

import { Constants } from '../../utils/Constants';

const TOOL_ICON_SIZE = 20;

export type Tool =
    | typeof Constants.SELECT_TOOL_LABEL
    | typeof Constants.DRAW_TOOL_LABEL
    | typeof Constants.TEXT_TOOL_LABEL
    | typeof Constants.RECT_TOOL_LABEL
    | typeof Constants.POLYGON_TOOL_LABEL;

const TOOL_ITEMS: Array<{
    tool: Tool;
    icon: React.ReactNode;
}> = [
    { tool: Constants.SELECT_TOOL_LABEL as Tool, icon: <MousePointer size={TOOL_ICON_SIZE} /> },
    { tool: Constants.DRAW_TOOL_LABEL as Tool, icon: <LineSquiggle size={TOOL_ICON_SIZE} /> },
    { tool: Constants.POLYGON_TOOL_LABEL as Tool, icon: <VectorSquare size={TOOL_ICON_SIZE} /> },
    { tool: Constants.RECT_TOOL_LABEL as Tool, icon: <Square size={TOOL_ICON_SIZE} /> },
    { tool: Constants.TEXT_TOOL_LABEL as Tool, icon: <Type size={TOOL_ICON_SIZE} /> },
];

interface ToolsProps {
    activeTool: Tool;
    isEditing: boolean;
    onToolChange: (tool: Tool) => void;
}

export const Tools = ({
                          activeTool,
                          isEditing,
                          onToolChange,
                      }: ToolsProps) => {
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

const ToolButton = ({
                        active,
                        disabled,
                        onClick,
                        children,
                    }: ToolButtonProps) => (
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
