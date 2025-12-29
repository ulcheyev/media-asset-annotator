export type AnnotationDataType = 'polyline' | 'text';

export type AnnotationData = {
  id: string;
  type: AnnotationDataType;
  label: string;
  points: number[] | string;
  timeStart?: number;
  timeEnd?: number;
  color?: string;
  opacity?: number;
  fill?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
};
