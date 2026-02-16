import type { Point } from '../types/geometry';
import type { Annotation } from '../types/intern/annotation.ts';

export const normalizePoint = (point: Point, width: number, height: number): Point => {
  return {
    x: point.x / width,
    y: point.y / height,
  };
};

export const denormalizePoint = (point: Point, width: number, height: number): Point => {
  return {
    x: point.x * width,
    y: point.y * height,
  };
};

export const normalizePoints = (points: number[], width: number, height: number): number[] => {
  const normalized: number[] = [];

  for (let i = 0; i < points.length; i += 2) {
    normalized.push(points[i] / width);
    normalized.push(points[i + 1] / height);
  }

  return normalized;
};

export const denormalizePoints = (points: number[], width: number, height: number): number[] => {
  const denormalized: number[] = [];

  for (let i = 0; i < points.length; i += 2) {
    denormalized.push(points[i] * width);
    denormalized.push(points[i + 1] * height);
  }

  return denormalized;
};

export const getPointsFromStringPoints = (points: string): number[] => {
  return points
    .trim()
    .split(/[,\s]+/)
    .map(Number);
};

export const getStringPointsFromPoints = (points: number[]): string => {
  const result: string[] = [];

  for (let i = 0; i < points.length; i += 2) {
    result.push(`${points[i]},${points[i + 1]}`);
  }

  return result.join(' ');
};

const getFirstPointFromStringPoints = (points: string): Point => {
  let i = 0;

  // Parse X
  let xStr = '';
  while (i < points.length && points[i] !== ',') {
    xStr += points[i++];
  }

  if (points[i] !== ',') {
    throw new Error(`getFirstPointFromStringPoints: invalid format (missing comma)`);
  }

  i++; // skip ','

  // Parse Y
  let yStr = '';
  while (i < points.length && points[i] !== ' ' && points[i] !== '\n' && points[i] !== '\t') {
    yStr += points[i++];
  }

  const x = Number(xStr);
  const y = Number(yStr);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error(`getFirstPointFromStringPoints: invalid numeric values ("${xStr},${yStr}")`);
  }

  return { x, y };
};

export const getFirstPoint = (points: string | number[]): { x: number; y: number } => {
  if (typeof points === 'string') {
    return getFirstPointFromStringPoints(points);
  }

  return getFirstPointFromPoints(points);
};

export const getFirstPointFromPoints = (points: number[]): Point => {
  return { x: points[0], y: points[1] };
};

export const normalizeAnnotations = (
  annotations: Annotation[],
  width: number,
  height: number,
): Annotation[] => {
  return annotations.map((ann) => {
    if (ann.kind === 'polyline') {
      return {
        ...ann,
        points: normalizePoints(ann.points, width, height),
      };
    }

    const norm = normalizePoints([ann.x, ann.y], width, height);
    return {
      ...ann,
      x: norm[0],
      y: norm[1],
      fontSize: ann.fontSize / height,
    };
  });
};
