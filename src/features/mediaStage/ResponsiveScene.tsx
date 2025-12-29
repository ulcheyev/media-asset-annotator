import { useEffect, useRef } from 'react';
import { Constants } from '../../utils/Constants';
import type { MediaLayout } from '../../types/intern/media';

interface ResponsiveSceneProps {
  children: React.ReactNode;
  onLayoutChange: (layout: MediaLayout) => void;
}

export const ResponsiveScene = ({ children, onLayoutChange }: ResponsiveSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      const containerHeight = entry.contentRect.height;
      const scaleX = containerWidth / Constants.DEFAULT_SCENE_WIDTH;
      const scaleY = containerHeight / Constants.DEFAULT_SCENE_HEIGHT;
      // preserve aspect ratio
      const scale = Math.min(scaleX, scaleY);
      const newLayout: MediaLayout = {
        width: Constants.DEFAULT_SCENE_WIDTH,
        height: Constants.DEFAULT_SCENE_HEIGHT,
        scale,
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
