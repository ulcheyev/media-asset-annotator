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

export type VisibilityMode =
    | { type: 'auto' }      // based on time
    | { type: 'force'; value: boolean } // forced by user

type BaseAnnotation = {
  id: string;
  kind: AnnotationDataType;
  label: string;
  time: TimeRange;
  style: AnnotationStyle;
  visibilityMode?: VisibilityMode;
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

export type AnnotationView = Annotation & {
  isVisibleNow: boolean;
};

export type AnnotationPatch = {
  label?: string;
  visibilityMode?: VisibilityMode;
  style?: Partial<Annotation['style']>;
  text?: string;
  time?: Annotation['time'];
  x?: number;
  y?: number;
  fontSize?: number;
  fontWeight?: number;
  points?: number[];
};
