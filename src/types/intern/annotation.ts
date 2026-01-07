import type { AnnotationDataType } from '../extern/annotationData.ts';

export type TimeRange = {
  start: number;
  end: number;
};

type AnnotationStyle = {
  color: string;
  opacity: number;
  fill: string;
  strokeWidth: number;
};

type BaseAnnotation = {
  id: string;
  kind: AnnotationDataType;
  label: string;
  time: TimeRange;
  style: AnnotationStyle;
};

export type PolylineAnnotation = BaseAnnotation & {
  kind: 'polyline';
  points: number[];
};

export type TextAnnotation = BaseAnnotation & {
  kind: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fontWeight: number;
};

export type Annotation = PolylineAnnotation | TextAnnotation;

export type AnnotationPatch = {
  label?: string,
  style?: Partial<Annotation['style']>;
  text?: string;
  time?: Annotation['time'];
  x?: number;
  y?: number;
  fontSize?: number;
  fontWeight?: number;
  points?: number[];
};
