import { MediaAssetContainer } from './asset/MediaAssetContainer.tsx';
import { usePlayback } from '../context/playback/usePlayback.ts';
import { useEditor } from '../context/editor/useEditor.ts';
import { useMediaAsset } from '../context/mediaAsset/useMediaAsset.ts';

export const MediaStage = () => {
  const { asset, layout, setLayout } = useMediaAsset();
  const {
    annotations,
    selectedId,
    isEditing,
    updateAnnotation,
    commitAnnotation,
    selectAnnotation,
    getToolController,
  } = useEditor();

  const { cursor, isActive, setActive } = usePlayback();

  if (!asset) return null;

  return (
    <MediaAssetContainer
      asset={asset}
      layout={layout}
      isActive={isActive}
      setActive={setActive}
      setLayout={setLayout}
      annotations={annotations}
      selectedId={selectedId}
      isEditing={isEditing}
      currentTime={cursor.t}
      onUpdateAnnotation={(a) => updateAnnotation(a.id, a)}
      onCommitAnnotation={commitAnnotation}
      onSelectAnnotation={selectAnnotation}
      toolController={getToolController()}
    />
  );
};
