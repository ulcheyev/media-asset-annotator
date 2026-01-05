import type { MediaAsset } from '../../../types/intern/media';
import { Constants } from '../../../utils/Constants';
import VideoAsset from './video/VideoAsset';
import type { Annotation } from '../../../types/intern/annotation';

interface MediaAssetContainerProps {
    asset: MediaAsset;
    selectedAnnotation?: Annotation;
    onUpdateAnnotation?: (annotation: Annotation) => void;
    isEditing?: boolean;
    width: number;
    height: number;
    scale: number;
    onTimeUpdate?: () => void;
    children?: React.ReactNode;
}

export const MediaAssetContainer = ({
                                        asset,
                                        selectedAnnotation,
                                        onUpdateAnnotation,
    isEditing,
                                        width,
                                        height,
                                        scale,
                                        onTimeUpdate,
                                        children,
                                    }: MediaAssetContainerProps) => {
    const viewportStyle: React.CSSProperties = {
        width: width * scale,
        height: height * scale,
        position: 'relative',
    };

    if (asset.type === Constants.IMAGE_ASSET_TYPE_LABEL) {
        return (
            <div style={viewportStyle}>
                <img
                    src={asset.src}
                    draggable={false}
                    className="w-full h-full object-contain"
                    alt=""
                />
                {children}
            </div>
        );
    }

    if (asset.type === Constants.VIDEO_ASSET_TYPE_LABEL) {
        return (
                    <VideoAsset
                        isEditing={isEditing}
                        asset={asset}
                        selectedAnnotation={selectedAnnotation}
                        onUpdateAnnotation={onUpdateAnnotation}
                        onTimeUpdate={onTimeUpdate}
                    >
                        {children}
                    </VideoAsset>

        );
    }

    return null;
};
