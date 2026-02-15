import type { MediaAsset, MediaType } from '../../types/intern/media.ts';

export const mockMediaAssetList: MediaAsset[] = [
  {
    id: '1',
    type: 'video' as MediaType,
    src: 'https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4',
    status: 'pending',
    modifiedAt: '2024-06-01T12:00:00Z',
  },
  {
    id: '2',
    type: 'video' as MediaType,
    src: 'https://cdn.pixabay.com/video/2023/09/15/180693-864967735_large.mp4',
    status: 'annotated',
    modifiedAt: '2024-06-02T15:30:00Z',
  },
  {
    id: '3',
    type: 'image' as MediaType,
    src: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
    status: 'pending',
    modifiedAt: '2024-06-03T09:45:00Z',
  },
  {
    id: '4',
    type: 'image' as MediaType,
    src: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg',
    status: 'annotated',
    modifiedAt: '2024-06-04T18:20:00Z',
  },
  {
    id: '5',
    type: 'image' as MediaType,
    src: 'https://cdn.eso.org/images/thumb300y/eso2008a.jpg',
    status: 'annotated',
    modifiedAt: '2024-06-04T18:20:00Z',
  },
];
