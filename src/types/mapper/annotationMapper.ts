import type {AnnotationData} from '../extern/annotationData.ts';
import type {PolylineAnnotation, TextAnnotation, TimeRange} from '../intern/annotation';
import {Constants} from '../../utils/Constants';
import {
    denormalizePoint,
    denormalizePoints,
    getFirstPoint,
    getPointsFromStringPoints,
} from '../../utils/geometry.utils.ts';

export const getTextAnnotationFromAnnotationData = (
  annotationData: AnnotationData,
  mediaAssetWidth = 1,
  mediaAssetHeight = 1,
): TextAnnotation => {
  const timeRange: TimeRange = {
    start: annotationData.timeStart ?? 0,
    end: annotationData.timeEnd ?? 0,
  };
  const textStyle = {
    color: annotationData.color ?? Constants.TEXT_DEFAULT_COLOR,
    opacity: annotationData.opacity ?? Constants.TEXT_DEFAULT_OPACITY,
    fill: annotationData.color ?? Constants.TEXT_DEFAULT_FILL,
    strokeWidth: annotationData.strokeWidth ?? Constants.TEXT_DEFAULT_STROKE_WIDTH,
  };
  const firstPoint = denormalizePoint(
    getFirstPoint(annotationData.points),
    mediaAssetWidth,
    mediaAssetHeight,
  );
  const fontSize = (annotationData.fontSize ?? Constants.TEXT_DEFAULT_FONT_SIZE) * mediaAssetHeight;
  const fontWeight = annotationData.fontWeight ?? Constants.TEXT_DEFAULT_FONT_WEIGHT;
  return {
    kind: 'text',
    id: annotationData.id,
    label: annotationData.label,
    x: firstPoint.x,
    y: firstPoint.y,
    text: annotationData.text ?? '',
    fontSize: fontSize,
    fontWeight: fontWeight,
    time: timeRange,
    style: textStyle,
  };
};

export const getPolylineAnnotationFromAnnotationData = (
  annotationData: AnnotationData,
  mediaAssetWidth = 1,
  mediaAssetHeight = 1,
): PolylineAnnotation => {
  const timeRange: TimeRange = {
    start: annotationData.timeStart ?? 0,
    end: annotationData.timeEnd ?? 0,
  };
  const polylineStyle = {
    color: annotationData.color ?? Constants.POLYLINE_DEFAULT_COLOR,
    opacity: annotationData.opacity ?? Constants.POLYLINE_DEFAULT_OPACITY,
    fill: annotationData.fill ?? Constants.POLYLINE_DEFAULT_FILL,
    strokeWidth: annotationData.strokeWidth ?? Constants.POLYLINE_DEFAULT_STROKE_WIDTH,
  };
  const points = denormalizePoints(
    typeof annotationData.points === 'string'
      ? getPointsFromStringPoints(annotationData.points)
      : annotationData.points,
    mediaAssetWidth,
    mediaAssetHeight,
  );
  return {
    kind: 'polyline',
    id: annotationData.id,
    label: annotationData.label,
    points: points,
    time: timeRange,
    style: polylineStyle,
  };
};
