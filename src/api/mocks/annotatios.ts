import type { AnnotationData } from '../../types/extern/annotation-data';

export const mockAnnotations: AnnotationData[] = [
  {
    id: 'a1',
    type: 'polyline',
    label: 'My beautiful polyline 1',
    points:
      '0.22708333333333333,0.4304857621440536 0.33125,0.5142378559463987 0.4354166666666667,0.4639865996649916',
    timeStart: 0,
    timeEnd: 10,
    color: '#ff0000',
    opacity: 0.8,
    strokeWidth: 3,
  },
  {
    id: 'a2',
    type: 'text',
    label: 'My awesome text 1',
    points: '0.2875,0.4221105527638191', // text anchor encoded as string
    timeStart: 0,
    timeEnd: 8,
    text: 'Hello world',
    fontSize: 0.083424,
    fontWeight: 200,
    color: '#00ff00',
    opacity: 1,
  },
];
