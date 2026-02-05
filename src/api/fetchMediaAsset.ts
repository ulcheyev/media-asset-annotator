import type { MediaAsset } from '../types/intern/media';
import { mockVideoMediaAsset } from './mocks/mediaAsset.ts';
import { runtimeConfig } from '../utils/runtimeConfig.ts';

export const fetchMediaAsset = async (mediaAssetId: string): Promise<MediaAsset> => {
  if (runtimeConfig.USE_MOCK) {
    console.warn('[fetchAnnotations] DEV mode – returning mock asset data');
    return mockVideoMediaAsset;
  }

  const response = await fetch(`${runtimeConfig.MEDIA_ASSET_FETCH_API_URL}/${mediaAssetId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch media asset');
  }

  return response.json();
};
