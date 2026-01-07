import { useEffect, useState } from 'react';
import { MediaAssetContext } from './MediaAssetContext';
import type { MediaAsset, MediaLayout } from '../../../types/intern/media.ts';
import { Constants } from '../../../utils/Constants.ts';
import { fetchMediaAsset } from '../../../api/fetchMediaAsset.ts';

export const MediaAssetProvider = ({
  mediaAssetId,
  children,
}: {
  mediaAssetId: string;
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

        const asset = await fetchMediaAsset(mediaAssetId);
        if (cancelled) return;

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
  }, [mediaAssetId]);

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
