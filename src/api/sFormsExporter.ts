import type { MediaAsset } from '../types/intern/media.ts';
import type { Annotation } from '../types/intern/annotation.ts';
import { normalizePoints } from '../utils/geometryUtils.ts';

const NS = {
  asset: 'http://onto.fel.cvut.cz/ontologies/form/media/asset',
  annotation: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation',
  hasSource: 'http://onto.fel.cvut.cz/ontologies/form/media/has-source',
  hasAnnotation: 'http://onto.fel.cvut.cz/ontologies/form/media/has-annotation',
  hasText: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-text',
  hasFontSize: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-font-size',
  hasFontWeight: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-font-weight',
  annotationType: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-annotation-type',
  startTime: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-start-time',
  endTime: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-end-time',
  geometry: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-geometry-points',
  strokeColor: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-stroke-color',
  strokeWidth: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-stroke-width',
  fillColor: 'http://onto.fel.cvut.cz/ontologies/form/media/annotation/has-fill-color',
};

export const exportAsSFormsObject = (
  mediaAsset: MediaAsset,
  containerWidth: number,
  containerHeight: number,
  annotations: Annotation[],
) => {
  return {
    '@id': `asset-${mediaAsset.id}`,
    '@type': NS.asset,

    [NS.hasSource]: mediaAsset.src,

    [NS.hasAnnotation]: annotations
      .map((a, index) => {
        let normalized = [];
        if (a.kind === 'polyline') {
          normalized = normalizePoints(a.points, containerWidth, containerHeight);
        } else {
          normalized = normalizePoints([a.x, a.y], containerWidth, containerHeight);
        }

        // normalize geometry

        const geometryString = normalized
          .reduce<string[]>((acc, value, i) => {
            if (i % 2 === 0) {
              acc.push(`${value},${normalized[i + 1]}`);
            }
            return acc;
          }, [])
          .join(' ');

        return {
          '@id': `annotation-${mediaAsset.id}-${index}`,
          '@type': NS.annotation,

          [NS.annotationType]: a.kind,

          [NS.startTime]: a.time.start,
          [NS.endTime]: a.time.end,

          [NS.geometry]: geometryString,

          ...(a.style?.color && {
            [NS.strokeColor]: a.style.color,
          }),
          ...(a.kind === 'text' && {
            [NS.hasText]: a.text,
            [NS.hasFontSize]: a.fontSize / containerHeight,
            [NS.hasFontWeight]: a.fontWeight
          }),
          ...(a.style?.strokeWidth && {
            [NS.strokeWidth]: String(a.style.strokeWidth),
          }),

          [NS.fillColor]: a.style?.fill ?? 'none',
        };
      })
      .filter(Boolean),
  };
};
