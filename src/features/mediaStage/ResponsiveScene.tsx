import { useEffect, useRef } from 'react';
import type { MediaLayout } from '../../types/intern/media';

interface ResponsiveSceneProps {
  children: React.ReactNode;
  onLayoutChange: (layout: MediaLayout) => void;
  layout: MediaLayout | null;
}

export const ResponsiveScene = ({ children, onLayoutChange, layout }: ResponsiveSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!layout) return;
      const containerWidth = entry.contentRect.width;
      const containerHeight = entry.contentRect.height;
      const scaleX = containerWidth / layout.width;
      const scaleY = containerHeight / layout.height;
      const newLayout: MediaLayout = {
        ...layout,
        scaleX,
        scaleY,
      };
      onLayoutChange(newLayout);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [onLayoutChange]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {children}
    </div>
  );
};
