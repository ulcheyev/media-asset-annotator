import { StageSurface } from '../StageSurface.tsx';
import { Constants } from '../../../utils/Constants.ts';
import VideoAsset from './video/VideoAsset.tsx';
import type { ToolController } from '../../toolbox/toolsContext/ToolController.ts';
import type { Annotation } from '../../../types/intern/annotation.ts';
import type { MediaAsset, MediaLayout, MediaResolution } from '../../../types/intern/media.ts';
import ImageAsset from './image/ImageAsset.tsx';

interface MediaAssetContainerProps {
  asset: MediaAsset;
  layout: MediaLayout | null;
  onAssetSrcReady: (mediaResolution: MediaResolution) => void;
  annotations: Annotation[];
  selectedId: string | null;
  isEditing: boolean;
  isActive?: boolean;
  setActive?: (active: boolean) => void;
  currentTime: number;
  toolController: ToolController;
  onUpdateAnnotation: (annotation: Annotation) => void;
  onCommitAnnotation: (before: Annotation, after: Annotation) => void;
  onSelectAnnotation: (id: string | null) => void;
}

export const MediaAssetContainer = (props: MediaAssetContainerProps) => {
  const {
    asset,
    layout,
    onAssetSrcReady,
    annotations,
    selectedId,
    isEditing,
    isActive,
    setActive,
    currentTime,
    toolController,
    onUpdateAnnotation,
    onCommitAnnotation,
    onSelectAnnotation,
  } = props;

  const overlay = (size: { width: number; height: number }) => (
    <StageSurface
      width={size.width}
      height={size.height}
      isActive={isActive}
      annotations={annotations}
      selectedId={selectedId}
      isEditing={isEditing}
      currentTime={currentTime}
      mediaType={asset.type}
      onSelect={onSelectAnnotation}
      onUpdate={onUpdateAnnotation}
      onCommit={onCommitAnnotation}
      onPointerDown={(p) => toolController.onPointerDown(p)}
      onPointerMove={(p) => toolController.onPointerMove(p)}
      onPointerUp={(p) => toolController.onPointerUp(p)}
    />
  );

  if (asset.type === Constants.IMAGE_ASSET_TYPE_LABEL) {
    return (
      <ImageAsset asset={asset} onAssetSrcReady={onAssetSrcReady} layout={layout}>
        {layout && overlay(layout)}
      </ImageAsset>
    );
  }

  if (asset.type === Constants.VIDEO_ASSET_TYPE_LABEL) {
    return (
      <VideoAsset
        layout={layout}
        setActive={setActive}
        onAssetSrcReady={onAssetSrcReady}
        asset={asset}
        isEditing={isEditing}
        selectedAnnotation={annotations.find((a) => a.id === selectedId)}
        onCommitAnnotation={onCommitAnnotation}
      >
        {layout && overlay(layout)}
      </VideoAsset>
    );
  }

  return null;
};
