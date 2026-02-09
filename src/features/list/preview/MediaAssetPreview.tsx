import type { MediaAsset } from '../../../types/intern/media.ts';

export const MediaAssetPreview = ({ asset }: { asset: MediaAsset }) => {
  if (asset.type === 'image') {
    return (
      <img
        src={asset.src}
        alt="preview"
        className="h-12 w-12 rounded-md border object-cover bg-gray-100"
        loading="lazy"
      />
    );
  }

  if (asset.type === 'video') {
    return (
      <video
        src={asset.src}
        className="h-12 w-12 rounded-md border object-cover bg-gray-100"
        muted
        preload="metadata"
      />
    );
  }

  return null;
};
