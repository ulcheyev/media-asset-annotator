import { PlaybackProvider } from '../../features/context/playback/PlaybackProvider.tsx';
import { MediaAssetProvider } from '../../features/context/mediaAsset/MediaAssetProvider.tsx';
import { EditorProvider } from '../../features/context/editor/EditorProvider.tsx';
import { useMediaAsset } from '../../features/context/mediaAsset/useMediaAsset.ts';

import { MediaStage } from '../../features/mediaStage/MediaStage.tsx';
import { Toolbox } from '../../features/toolbox/ToolBox.tsx';
import { ResponsiveScene } from '../../features/mediaStage/ResponsiveScene.tsx';
import { useSearchParams } from 'react-router-dom';
import type { MediaAssetSource } from '../../types/intern/media.ts';
import { ErrorStatus } from '../../features/pageStatus/ErrorStatus.tsx';
import { LoadingStatus } from '../../features/pageStatus/LoadingStatus.tsx';

export const MediaAssetAnnotatorLayout = () => {
  const { asset, setLayout, loading, error } = useMediaAsset();

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
    <div className="w-full h-full flex">
      {/* Media */}
      <div className="w-8/10 h-full bg-black">
        <ResponsiveScene onLayoutChange={setLayout}>
          <MediaStage />
        </ResponsiveScene>
      </div>

      {/* Toolbox */}
      <div className="basis-2/10 flex-shrink-0 h-full border-l-white border-2">
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
