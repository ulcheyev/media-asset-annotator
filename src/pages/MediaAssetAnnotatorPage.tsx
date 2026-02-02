import { useParams } from 'react-router-dom';

import { PlaybackProvider } from '../features/context/playback/PlaybackProvider';
import { MediaAssetProvider } from '../features/context/mediaAsset/MediaAssetProvider';
import { EditorProvider } from '../features/context/editor/EditorProvider';
import { useMediaAsset } from '../features/context/mediaAsset/useMediaAsset';

import { MediaStage } from '../features/mediaStage/MediaStage';
import { Toolbox } from '../features/toolbox/ToolBox';
import { ResponsiveScene } from '../features/mediaStage/ResponsiveScene';
import {useSearchParams} from "react-router-dom";
import type {MediaAssetSource} from "../types/intern/media.ts";

export const MediaAssetAnnotatorLayout = () => {
  const { asset, setLayout, loading, error } = useMediaAsset();

  if (loading) return <div className="p-4 text-white-600">Loading…</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!asset) return <div className="p-4 text-red-600">Media not found</div>;

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
        source = { type: 'backend', id };
    } else if (url) {
        source = { type: 'external', url };
    }

    if (!source) {
        return (
            <div className="p-4 text-red-600">
                Missing ?id or ?url parameter
            </div>
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
