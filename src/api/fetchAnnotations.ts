import type { AnnotationData } from '../types/extern/annotationData.ts';
import { mockAnnotations } from './mocks/annotatios';
import { runtimeConfig } from '../utils/runtimeConfig.ts';

export const fetchAnnotations = async (mediaAssetId: string): Promise<AnnotationData[]> => {
  if (runtimeConfig.USE_MOCK_DATA) {
    console.warn('[fetchAnnotations] DEV mode – returning mock data');
    return mockAnnotations;
  }

  try {
    const response = await fetch(`${runtimeConfig.ANNOTATIONS_FETCH_API_URL}/${mediaAssetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch annotations: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid API response: expected array');
    }

    return data as AnnotationData[];
  } catch (error) {
    console.error('[fetchAnnotations] Error:', error);

    return [];
  }
};
