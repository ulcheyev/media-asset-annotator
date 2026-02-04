export type RuntimeConfig = {
  ANNOTATIONS_FETCH_API_URL: string;
  MEDIA_ASSET_FETCH_API_URL: string;
  DEMO_MEDIA_URL: string;
};

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig;
  }
}

export const runtimeConfig: RuntimeConfig = {
  ANNOTATIONS_FETCH_API_URL: window.__RUNTIME_CONFIG__?.ANNOTATIONS_FETCH_API_URL ?? '',
  MEDIA_ASSET_FETCH_API_URL: window.__RUNTIME_CONFIG__?.MEDIA_ASSET_FETCH_API_URL ?? '',
  DEMO_MEDIA_URL: window.__RUNTIME_CONFIG__?.DEMO_MEDIA_URL ?? '',
};
