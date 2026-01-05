import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { MediaAsset, MediaLayout } from '../types/intern/media';
import type {Annotation, AnnotationPatch} from '../types/intern/annotation';
import { fetchAnnotations } from '../api/fetchAnnotations';
import {
  getPolylineAnnotationFromAnnotationData,
  getTextAnnotationFromAnnotationData,
} from '../types/mapper/annotationMapper';
import { MediaStage } from '../features/mediaStage/MediaStage';
import { fetchMediaAsset } from '../api/fetchMediaAsset.ts';
import { Toolbox } from '../features/toolbox/ToolBox.tsx';
import { Constants } from '../utils/Constants.ts';
import { exportAsSFormsObject } from '../api/sFormsExporter.ts';
import { ResponsiveScene } from '../features/mediaStage/ResponsiveScene.tsx';
import type {Tool} from "../features/toolbox/Tools.tsx";

interface MediaEditorLayoutProps {
  media: React.ReactNode;
    toolbox: React.ReactNode;
}

export const MediaEditorLayout = ({ media, toolbox }: MediaEditorLayoutProps) => {
  return (
      <div className="w-full h-full flex">
        {/* Left: media */}
        <div className="w-8/10 h-full">{media}</div>

        {/* Right: toolbox */}
        <div className="basis-2/10 flex-shrink-0 h-full border-l-white border-2">
          {toolbox}
        </div>
      </div>
  );
};

interface MediaViewportProps {
  children: React.ReactNode;
}

const MediaViewport = ({children}: MediaViewportProps) => {
  return <div className="bg-black h-full w-full">{children}</div>;
};

export const MediaAssetAnnotatorPage = () => {
  const { mediaAssetId } = useParams<{ mediaAssetId: string }>();
  const [tool, setTool] = useState<Tool>(Constants.SELECT_TOOL_LABEL as Tool);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [layout, setLayout] = useState<MediaLayout>({
    width: Constants.DEFAULT_SCENE_WIDTH,
    height: Constants.DEFAULT_SCENE_HEIGHT,
    scale: 1,
  });
  const [mediaAsset, setMediaAsset] = useState<MediaAsset | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
  }, [mediaAssetId]);

  const toggleEdit = () => {
    setIsEditing((prev) => {
      if (prev) {
        setTool(Constants.SELECT_TOOL_LABEL as Tool);
        setSelectedId(null);
      }
      return !prev;
    });
  };

  const handleDelete = () => {
    setAnnotations((prev) => {
      if (!selectedId) return prev;
      return prev.filter((a) => a.id !== selectedId);
    });
    setSelectedId(null);
  };

  const updateAnnotation = (id: string, patch: AnnotationPatch) => {
    setAnnotations((prev) =>
        prev.map((a) => {
          if (a.id !== id) return a;

          return {
            ...a,
            ...patch,
            style: patch.style
                ? { ...a.style, ...patch.style }
                : a.style,
          };
        })
    );
  };


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
            <MediaStage
                activeTool={tool}
              isEditing={isEditing}
              layout={layout}
              asset={mediaAsset}
              annotations={annotations}
              onUpdate={setAnnotations}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </MediaViewport>
        </ResponsiveScene>
      }
      toolbox={
        <Toolbox
            isEditing={isEditing}
            activeTool={tool}
            annotations={annotations}
            selectedAnnotationId={selectedId}
            onToggleEdit={toggleEdit}
            onToolChange={setTool}
            onSelectAnnotation={setSelectedId}
            onUpdateAnnotationStyle={updateAnnotation}
            onUndo={() => {}}
            onRedo={() => {}}
            onDelete={handleDelete}
            onSave={handleSave}
        />
      }
    />
  );
};
