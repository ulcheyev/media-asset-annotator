import type { MediaAsset } from '../../types/intern/media.ts';
import { Constants } from '../../utils/Constants.ts';

interface MediaAssetContainerProps {
  asset: MediaAsset;
  width: number;
  height: number;
  scale: number;
  onTimeUpdate?: () => void;
}

export const MediaAssetContainer = ({
  asset,
  width,
  height,
  scale,
  onTimeUpdate,
}: MediaAssetContainerProps) => {
  const style: React.CSSProperties = {
    width: width * scale,
    height: height * scale,
    display: 'block',
  };

  if (asset.type === Constants.IMAGE_ASSET_TYPE_LABEL) {
    return <img src={asset.src} style={style} draggable={false} />;
  }

  if (asset.type === Constants.VIDEO_ASSET_TYPE_LABEL) {
    return <video src={asset.src} controls onTimeUpdate={onTimeUpdate} style={style} />;
  }

  return null;
};
