import type { MediaLayout } from "../../../types/intern/media";

interface DynamicMediaFrameProps {
    layout: MediaLayout | null;
    children: React.ReactNode;
}

export default function DynamicMediaFrame({
                                              layout,
                                              children,
                                          }: DynamicMediaFrameProps) {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <div
                className="relative max-w-full max-h-full"
                style={layout ? { width: layout.width, height: layout.height } : undefined}
            >
                {children}
            </div>
        </div>
    );
}