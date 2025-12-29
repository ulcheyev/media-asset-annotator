export type MediaType = 'image' | 'video';

export type MediaAsset = {
  id?: string;
  type: MediaType;
  src: string;
  duration?: number;
};

export type MediaLayout = {
  width: number;
  height: number;
  scale: number;
};
