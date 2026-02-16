import { useEffect, useRef } from 'react';
import type { MediaAsset, MediaLayout, MediaResolution } from '../../../../types/intern/media';

interface ImageAssetProps {
  asset: MediaAsset;
  layout: MediaLayout | null;
  onAssetSrcReady: (mediaResolution: MediaResolution) => void;
  children: React.ReactNode;
}

export default function ImageAsset({ asset, onAssetSrcReady, layout, children }: ImageAssetProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const notify = () => {
      onAssetSrcReady({
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        clientWidth: img.clientWidth,
        clientHeight: img.clientHeight,
      });
    };

    if (img.complete) notify();
    else img.onload = notify;

    const ro = new ResizeObserver(notify);
    ro.observe(img);

    return () => ro.disconnect();
  }, [asset.src, onAssetSrcReady]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="relative"
        style={layout ? { width: layout.width, height: layout.height } : undefined}
      >
        <img
          ref={imgRef}
          src={asset.src}
          className="max-w-full max-h-full object-contain"
          draggable={false}
          alt="Beautiful Image"
        />
        {children}
      </div>
    </div>
  );
}
