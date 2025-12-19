export type LU_Point = {
  x: number;
  y: number;
};

export type TimeRange = {
  start: number;
  end: number;
};

export type AnnotationBase = {
  id: string;
  label: string;
  time: TimeRange;
  point: LU_Point;
};

export type RectAnnotation = AnnotationBase & {
  type: 'rect';
  width: number;
  height: number;
};
