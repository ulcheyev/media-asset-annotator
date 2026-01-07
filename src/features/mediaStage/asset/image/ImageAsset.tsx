import { useEffect, useRef, useState } from 'react';
import type { MediaAsset, MediaLayout } from '../../../../types/intern/media';

interface ImageAssetProps {
    asset: MediaAsset;
    layout: MediaLayout;
    setLayout: (layout: MediaLayout) => void;
    children: (viewport: {
        cssWidth: number;
        cssHeight: number;
        scaleX: number;
        scaleY: number;
    }) => React.ReactNode;
}

export default function ImageAsset({
                                       asset,
                                       layout,
                                       setLayout,
                                       children,
                                   }: ImageAssetProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [cssSize, setCssSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    /* ---------------- measure rendered image ---------------- */

    useEffect(() => {
        if (!imgRef.current) return;

        const img = imgRef.current;

        const update = () => {
            const cssWidth = img.clientWidth;
            const cssHeight = img.clientHeight;

            setCssSize({ width: cssWidth, height: cssHeight });

            const scaleX = cssWidth / layout.width;
            const scaleY = cssHeight / layout.height;
            const scale = Math.min(scaleX, scaleY);

            setLayout({
                width: cssWidth,
                height: cssHeight,
                scale,
            });
        };

        update();

        const ro = new ResizeObserver(update);
        ro.observe(img);

        return () => ro.disconnect();
    }, [layout.width, layout.height, setLayout]);


    return (
        <div className="flex w-full h-full items-center justify-center bg-black">
            <div className="relative">
                {/* IMAGE */}
                <img
                    ref={imgRef}
                    src={asset.src}
                    className="block max-w-full max-h-full object-contain select-none pointer-events-none"
                    draggable={false}
                    alt=""
                />

                {/* STAGE OVERLAY — EXACTLY IMAGE SIZE */}
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
