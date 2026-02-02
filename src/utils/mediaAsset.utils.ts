export const getMediaKindFromSource = (source: string) => {
  const lower = source.toLowerCase();

  switch (true) {
    case lower.includes('m3u8'):
    case lower.includes('mp4'):
    case lower.includes('webm'):
    case lower.includes('mov'):
      return 'video';

    case /\b(png|jpg|jpeg|webp|gif|bmp)\b/.test(lower):
      return 'image';

    default:
      return 'unknown';
  }
};
