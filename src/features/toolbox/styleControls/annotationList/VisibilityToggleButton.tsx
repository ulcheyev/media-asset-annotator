import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface VisibilityToggleButtonProps {
  isVisibleNow: boolean;
  onForceVisible: (visible: boolean) => void;
}

export const VisibilityToggleButton = ({
  isVisibleNow,
  onForceVisible,
}: VisibilityToggleButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onForceVisible(!isVisibleNow);
      }}
      className={clsx(
        'p-1 rounded transition-colors',
        'text-neutral-400 hover:text-neutral-200',
        'hover:bg-neutral-700',
      )}
    >
      {isVisibleNow ? <Eye size={20} /> : <EyeOff size={20} />}
    </button>
  );
};
