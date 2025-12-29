import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { MediaAsset, MediaLayout } from '../types/intern/media';
import type { Annotation } from '../types/intern/annotation';
import { fetchAnnotations } from '../api/fetchAnnotations';
import {
  getPolylineAnnotationFromAnnotationData,
  getTextAnnotationFromAnnotationData,
} from '../types/mapper/annotationMapper';
import { MediaStage } from '../features/mediaStage/MediaStage';
import { fetchMediaAsset } from '../api/fetchMediaAsset.ts';
import { type Tool, Toolbox } from '../features/toolbox/ToolBox.tsx';
import { Constants } from '../utils/Constants.ts';
import { exportAsSFormsObject } from '../api/sFormsExporter.ts';
import { ResponsiveScene } from '../features/mediaStage/ResponsiveScene.tsx';

interface MediaEditorLayoutProps {
  media: React.ReactNode;
  toolbox: React.ReactNode;
}

export const MediaEditorLayout = ({ media, toolbox }: MediaEditorLayoutProps) => {
  return (
    <div
      className="grid h-full w-full overflow-hidden"
      style={{
        gridTemplateColumns: '84% 16%',
      }}
    >
      {/* Left: media */}
      <div className="flex items-center justify-center">{media}</div>

      {/* Right: toolbox */}
      <div className="h-full border-l border-neutral-700">{toolbox}</div>
    </div>
  );
};

interface MediaViewportProps {
  children: React.ReactNode;
}

const MediaViewport = ({ children }: MediaViewportProps) => {
  return (
    <div
      className="relative bg-black"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

export const MediaAssetAnnotatorPage = () => {
  const { mediaAssetId } = useParams<{ mediaAssetId: string }>();
  const [tool, setTool] = useState<Tool>(Constants.SELECT_TOOL_LABEL as Tool);
  const [layout, setLayout] = useState<MediaLayout>({
    width: Constants.DEFAULT_SCENE_WIDTH,
    height: Constants.DEFAULT_SCENE_HEIGHT,
    scale: 1,
  });
  const [mediaAsset, setMediaAsset] = useState<MediaAsset | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mediaAssetId) {
      setError('Missing mediaAssetId in URL');
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const asset = await fetchMediaAsset(mediaAssetId);
        const annotationData = await fetchAnnotations(mediaAssetId);
        setMediaAsset(asset);
        setAnnotations(
          annotationData
            .map((a) => {
              switch (a.type) {
                case 'text':
                  return getTextAnnotationFromAnnotationData(a, layout.width, layout.height);
                case 'polyline':
                  return getPolylineAnnotationFromAnnotationData(a, layout.width, layout.height);
                default:
                  return null;
              }
            })
            .filter((a): a is Annotation => a !== undefined),
        );
      } catch (e) {
        console.error(e);
        setError('Failed to load media asset');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [mediaAssetId, layout]);

  if (loading) {
    return <div className="p-4 text-white-600">Loading…</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!mediaAsset) {
    return <div className="p-4 text-red-600">Media not found</div>;
  }

  const handleSave = () => {
    if (!layout) {
      console.warn('Layout not ready');
      return;
    }
    const { width, height } = layout;
    console.log(exportAsSFormsObject(mediaAsset, width, height, annotations));
  };


  return (
    <MediaEditorLayout
      media={
        <ResponsiveScene onLayoutChange={setLayout}>
          <MediaViewport>
            <MediaStage isEditing={tool===Constants.EDIT_BUTTON_TOOL_LABEL}
              layout={layout}
              asset={mediaAsset}
              annotations={annotations}
              onUpdate={setAnnotations}
            />
          </MediaViewport>
        </ResponsiveScene>
      }
      toolbox={<Toolbox activeTool={tool} onToolChange={setTool} onSave={handleSave} />}
    />
  );
};
