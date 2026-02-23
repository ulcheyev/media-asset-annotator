import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface VisibilityToggleButtonProps {
    visible: boolean;
    onToggle: () => void;
}

export const VisibilityToggleButton = ({
                                           visible,
                                           onToggle,
                                       }: VisibilityToggleButtonProps) => {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
            className={clsx(
                'p-1 rounded transition-colors',
                'text-neutral-400 hover:text-neutral-200',
                'hover:bg-neutral-700'
            )}
        >
            {visible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
    );
};