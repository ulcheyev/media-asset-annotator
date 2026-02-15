import { useEffect, useRef, useState } from 'react';
import type { MediaAsset, MediaLayout } from '../../../../types/intern/media';

interface ImageAssetProps {
  asset: MediaAsset;
  layout: MediaLayout;
  setLayout: (layout: MediaLayout) => void;
  children: (viewport: { w: number; h: number; scaleX: number; scaleY: number }) => React.ReactNode;
}

export default function ImageAsset({ asset, layout, setLayout, children }: ImageAssetProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [cssSize, setCssSize] = useState<{
    width: number;
    height: number;
    scaleX: number;
    scaleY: number;
  } | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;

    const update = () => {
      const cssWidth = img.naturalWidth;
      const cssHeight = img.naturalHeight;
      const scaleX = cssWidth / layout.width;
      const scaleY = cssHeight / layout.height;
      setCssSize({ width: cssWidth, height: cssHeight, scaleX, scaleY });

      console.log('Image resized:', cssWidth, cssHeight);
      console.log('Original layout:', layout.width, layout.height);
      console.log('Calculated scales:', scaleX, scaleY);
      const scale = Math.min(scaleX, scaleY);

      setLayout({
        width: cssWidth,
        height: cssHeight,
        scale,
      });
    };

    if (!layout) update();

    const ro = new ResizeObserver(update);
    ro.observe(img);

    return () => ro.disconnect();
  }, [layout.width, layout.height, setLayout]);

  return (
    <div className="flex w-full h-full items-center justify-center bg-black">
      <div className="relative">
        <img
          ref={imgRef}
          src={asset.src}
          className="block max-w-full max-h-full object-contain select-none pointer-events-none"
          draggable={false}
          alt=""
        />

        {cssSize &&
          children({
            w: cssSize.width,
            h: cssSize.height,
            scaleX: layout.scale,
            scaleY: layout.scale,
          })}
      </div>
    </div>
  );
}
