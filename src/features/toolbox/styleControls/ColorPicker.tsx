import {useRef} from "react";
import {HexColorPicker} from "react-colorful";

interface ColorPickerProps {
    color: string;
    onPreview: (color: string) => void;
    onCommit: (before: string, after: string) => void;
}

export const ColorPicker = ({
                                          color,
                                          onPreview,
                                          onCommit,
                                      }: ColorPickerProps) => {
    const beforeRef = useRef<string | null>(null);

    const handleMouseDown = () => {
        if (beforeRef.current === null) {
            beforeRef.current = color;
        }
    };

    const handleMouseUp = () => {
        if (beforeRef.current !== null) {
            onCommit(beforeRef.current, color);
            beforeRef.current = null;
        }
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // safety net
        >
            <HexColorPicker
                color={color}
                onChange={(c) => onPreview(c)}
            />
        </div>
    );
};