export type MediaType = 'image' | 'video';

export type MediaAsset = {
  id: string;
  type: MediaType;
  src: string;
  duration?: number;
  status?: "annotated" | "pending";
  modifiedAt?: string;
};

export type MediaLayout = {
  width: number;
  height: number;
  scale: number;
};

export type MediaAssetSource = { type: 'internal'; id: string } | { type: 'external'; url: string };
