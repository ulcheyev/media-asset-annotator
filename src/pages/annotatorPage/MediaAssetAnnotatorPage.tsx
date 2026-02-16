import { PlaybackProvider } from '../../features/context/playback/PlaybackProvider.tsx';
import { MediaAssetProvider } from '../../features/context/mediaAsset/MediaAssetProvider.tsx';
import { EditorProvider } from '../../features/context/editor/EditorProvider.tsx';
import { useMediaAsset } from '../../features/context/mediaAsset/useMediaAsset.ts';

import { MediaStage } from '../../features/mediaStage/MediaStage.tsx';
import { Toolbox } from '../../features/toolbox/ToolBox.tsx';
import { useSearchParams } from 'react-router-dom';
import type { MediaAssetSource } from '../../types/intern/media.ts';
import { ErrorStatus } from '../../features/pageStatus/ErrorStatus.tsx';
import { LoadingStatus } from '../../features/pageStatus/LoadingStatus.tsx';

export const MediaAssetAnnotatorLayout = () => {
  const { asset, loading, error } = useMediaAsset();

  if (loading) {
    return <LoadingStatus title="Loading media asset" description="Preparing the annotator…" />;
  }

  if (error) {
    return <ErrorStatus title="Failed to load media asset" description={error} />;
  }

  if (!asset) {
    return (
      <ErrorStatus
        title="Media not found"
        description="The requested media asset does not exist or is unavailable."
      />
    );
  }

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Media */}
      <div className="basis-4/5">
        <MediaStage />
      </div>
      {/* Toolbox */}
      <div className="basis-1/5 flex-shrink-0 border-l-white border-2">
        <Toolbox />
      </div>
    </div>
  );
};

export const MediaAssetAnnotatorPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const url = searchParams.get('url');
  let source: MediaAssetSource | null = null;

  if (id) {
    source = { type: 'internal', id };
  } else if (url) {
    source = { type: 'external', url };
  }

  if (!source) {
    return (
      <ErrorStatus title="Failed to load media asset" description="Missing ?id or ?url parameter" />
    );
  }

  return (
    <PlaybackProvider>
      <MediaAssetProvider source={source}>
        <EditorProvider>
          <MediaAssetAnnotatorLayout />
        </EditorProvider>
      </MediaAssetProvider>
    </PlaybackProvider>
  );
};
