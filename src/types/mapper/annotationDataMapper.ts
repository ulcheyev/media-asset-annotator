import type { Annotation, PolylineAnnotation, TextAnnotation } from '../intern/annotation';

import type { AnnotationData } from '../extern/annotationData.ts';
import {
  getStringPointsFromPoints,
  normalizePoint,
  normalizePoints,
} from '../../utils/geometry.utils.ts';

/**
 * Convert domain Annotation[] to API AnnotationData[]
 */
export const toAnnotationDataArray = (
  annotations: Annotation[],
  width = 1,
  height = 1,
): AnnotationData[] => {
  return annotations.map((annotation) => toAnnotationData(annotation, width, height));
};

/**
 * Convert single domain Annotation to API shape
 */
export const toAnnotationData = (
  annotation: Annotation,
  width: number,
  height: number,
): AnnotationData => {
  switch (annotation.kind) {
    case 'text':
      return mapTextAnnotation(annotation, width, height);

    case 'polyline':
      return mapPolylineAnnotation(annotation, width, height);
  }
};

const mapTextAnnotation = (
  annotation: TextAnnotation,
  width: number,
  height: number,
): AnnotationData => {
  const nPoint = normalizePoint({ x: annotation.x, y: annotation.y }, width, height);
  return {
    id: annotation.id,
    type: 'text',
    label: annotation.label,
    points: `${nPoint.x},${nPoint.y}`, // API expects string
    timeStart: annotation.time.start,
    timeEnd: annotation.time.end,
    color: annotation.style.color,
    opacity: annotation.style.opacity,
    text: annotation.text,
    fontSize: annotation.fontSize / height,
    fontWeight: annotation.fontWeight,
  };
};

const mapPolylineAnnotation = (
  annotation: PolylineAnnotation,
  width: number,
  height: number,
): AnnotationData => {
  return {
    id: annotation.id,
    type: 'polyline',
    label: annotation.label,
    points: getStringPointsFromPoints(normalizePoints(annotation.points, width, height)), // API expects string
    timeStart: annotation.time.start,
    timeEnd: annotation.time.end,
    color: annotation.style.color,
    opacity: annotation.style.opacity,
    fill: annotation.style.fill,
    strokeWidth: annotation.style.strokeWidth,
  };
};
