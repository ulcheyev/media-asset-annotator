import type { AnnotationData } from '../types/extern/annotation-data';
import { mockAnnotations } from './mocks/annotatios';

const ANNOTATIONS_FETCH_API_URL = import.meta.env.VITE_ANNOTATIONS_FETCH_API_URL as string;

export const fetchAnnotations = async (mediaAssetId: string): Promise<AnnotationData[]> => {
  if (import.meta.env.DEV) {
    console.warn('[fetchAnnotations] DEV mode – returning mock data');
    return mockAnnotations;
  }

  try {
    if (!ANNOTATIONS_FETCH_API_URL) {
      throw new Error('Missing VITE_ANNOTATIONS_FETCH_API_URL');
    }

    const response = await fetch(`${ANNOTATIONS_FETCH_API_URL}/${mediaAssetId}`, {
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
