import type { MediaAsset, MediaLayout } from '../../types/intern/media.ts';

export interface MediaAssetState {
  asset: MediaAsset | null;
  setAsset: (asset: MediaAsset) => void;

  layout: MediaLayout | null;
  setLayout: (l: MediaLayout) => void;

  loading: boolean;
  error: string | null;
}
