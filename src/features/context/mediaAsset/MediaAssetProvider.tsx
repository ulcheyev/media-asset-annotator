import { useEffect, useState } from 'react';
import { MediaAssetContext } from './MediaAssetContext';
import type { MediaAsset, MediaAssetSource, MediaLayout } from '../../../types/intern/media.ts';
import { Constants } from '../../../utils/Constants.ts';
import { fetchMediaAsset } from '../../../api/fetchMediaAsset.ts';
import { getMediaKindFromSource } from '../../../utils/mediaAsset.utils.ts';

export const MediaAssetProvider = ({
  source,
  children,
}: {
  source: MediaAssetSource;
  children: React.ReactNode;
}) => {
  const [asset, setAsset] = useState<MediaAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [layout, setLayout] = useState<MediaLayout>({
    width: Constants.DEFAULT_SCENE_WIDTH,
    height: Constants.DEFAULT_SCENE_HEIGHT,
    scale: 1,
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        let asset: MediaAsset;

        if (source.type === 'internal') {
          asset = await fetchMediaAsset(source.id);
        } else {
          const kind = getMediaKindFromSource(source.url);
          if (kind === 'unknown') {
            throw new Error('Unsupported media type');
          }
          asset = {
            id: 'external-' + source.url,
            src: source.url,
            type: kind,
          };
        }
        setAsset(asset);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError('Failed to load media asset');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [source]);

  return (
    <MediaAssetContext.Provider
      value={{
        asset,
        layout,
        setLayout,
        loading,
        error,
      }}
    >
      {children}
    </MediaAssetContext.Provider>
  );
};
