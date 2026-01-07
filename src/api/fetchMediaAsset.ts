import type {MediaAsset} from '../types/intern/media';
import {mockVideoMediaAsset} from './mocks/mediaAsset.ts';

export const fetchMediaAsset = async (mediaAssetId: string): Promise<MediaAsset> => {
  if (import.meta.env.DEV) {
    return mockVideoMediaAsset;
  }

  const response = await fetch(`${import.meta.env.VITE_MEDIA_ASSET_FETCH_API_URL}/${mediaAssetId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch media asset');
  }

  return response.json();
};
