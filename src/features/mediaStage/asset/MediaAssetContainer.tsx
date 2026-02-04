import { StageSurface } from '../StageSurface.tsx';
import { Constants } from '../../../utils/Constants.ts';
import VideoAsset from './video/VideoAsset.tsx';
import type { ToolController } from '../../toolbox/toolsContext/ToolController.ts';
import type {Annotation} from '../../../types/intern/annotation.ts';
import type { MediaAsset, MediaLayout } from '../../../types/intern/media.ts';
import ImageAsset from './image/ImageAsset.tsx';

interface MediaAssetContainerProps {
  asset: MediaAsset;
  layout: MediaLayout;
  setLayout: (layout: MediaLayout) => void;
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
    setLayout,
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

  const surface = (size: { w: number; h: number; scaleX: number; scaleY: number }) => (
    <StageSurface
      width={layout.width}
      height={layout.height}
      isActive={isActive}
      scaleX={size.scaleX}
      scaleY={size.scaleY}
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
      <ImageAsset asset={asset} setLayout={setLayout} layout={layout}>
        {surface}
      </ImageAsset>
    );
  }

  if (asset.type === Constants.VIDEO_ASSET_TYPE_LABEL) {
    return (
      <VideoAsset
        layout={layout}
        setActive={setActive}
        asset={asset}
        isEditing={isEditing}
        selectedAnnotation={annotations.find((a) => a.id === selectedId)}
        onCommitAnnotation={onCommitAnnotation}
      >
        {surface}
      </VideoAsset>
    );
  }

  return null;
};
