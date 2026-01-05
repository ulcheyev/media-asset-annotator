import clsx from 'clsx';
import { Edit, Undo, Redo, Trash2, Save } from 'lucide-react';

const ICON_SIZE = 20;

export const COMMAND_ITEMS = [
    { key: 'edit', icon: <Edit size={ICON_SIZE} /> },
    { key: 'undo', icon: <Undo size={ICON_SIZE} /> },
    { key: 'redo', icon: <Redo size={ICON_SIZE} /> },
    { key: 'delete', icon: <Trash2 size={ICON_SIZE} /> },
    { key: 'save', icon: <Save size={ICON_SIZE} /> },
] as const;

export type CommandKey = typeof COMMAND_ITEMS[number]['key'];

interface CommandsProps {
    isEditing: boolean;
    onCommand: (cmd: CommandKey) => void;
}

export const Commands = ({ isEditing, onCommand }: CommandsProps) => {
    return (
        <div className="p-2 flex justify-around border-b border-neutral-700">
            {COMMAND_ITEMS.map(({ key, icon }) => {
                const isEdit = key === 'edit';

                return (
                    <CommandButton
                        key={key}
                        active={isEdit && isEditing}
                        disabled={!isEdit && !isEditing}
                        onClick={() => onCommand(key)}
                    >
                        {icon}
                    </CommandButton>
                );
            })}
        </div>
    );
};

interface CommandButtonProps {
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const CommandButton = ({
                           active,
                           disabled,
                           onClick,
                           children,
                       }: CommandButtonProps) => (
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
