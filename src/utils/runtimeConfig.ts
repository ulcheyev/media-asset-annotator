// Prefix for Vite-exposed variables
const VITE_ENV_PREFIX = 'ANNOTATOR_';
export const APP_MODES = ['demo', 'dev', 'prod'] as const;
export type AppMode = (typeof APP_MODES)[number];

/**
 * Shape of runtime config injected at runtime (e.g. via runtime-env.js)
 */
export interface RuntimeConfig {
  DEMO_MEDIA_URL?: string;
  ANNOTATIONS_FETCH_API_URL?: string;
  MEDIA_ASSET_FETCH_API_URL?: string;
  BASE_PATH?: string;
}

/**
 * Extend Window type safely
 */
declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig;
  }
}

/**
 * Extract prefixed variables from import.meta.env
 */
function getViteEnv(): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(import.meta.env)) {
    if (key.startsWith(VITE_ENV_PREFIX) && typeof value === 'string') {
      const strippedKey = key.slice(VITE_ENV_PREFIX.length);
      result[strippedKey] = value;
    }
  }

  return result;
}

/**
 * Merge Vite env and runtime env (runtime takes precedence)
 */
const ENV: Record<string, string> = {
  ...getViteEnv(),
  ...(window.__RUNTIME_CONFIG__ ?? {}),
};

function env(name: string): string | undefined {
  return ENV[name];
}

function envOrDefault(name: string, defaultValue: string): string {
  const value = env(name);

  if (value === undefined || value.trim() === "") {
    return defaultValue;
  }

  return value;
}

function envRequired(name: string): string {
  const value = env(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseAppMode(value?: string): AppMode {
  if (value === 'demo' || value === 'dev' || value === 'prod') {
    return value;
  }
  return import.meta.env.DEV ? 'dev' : 'demo';
}

// Determine app mode
const APP_MODE: AppMode = parseAppMode(env('APP_MODE'));

const IS_DEMO = APP_MODE === 'demo';
const IS_DEV = APP_MODE === 'dev';
const IS_PROD = APP_MODE === 'prod';

// Export runtime config
export const runtimeConfig = {
  // mode
  APP_MODE,
  IS_DEMO,
  IS_DEV,
  IS_PROD,

  // behavior
  USE_MOCK_DATA: IS_DEMO || IS_DEV,

  // always available
  BASE_PATH: envOrDefault('BASE_PATH', '/'),
  DEMO_MEDIA_URL: envOrDefault(
    'DEMO_MEDIA_URL',
    'https://cdn.pixabay.com/video/2023/09/15/180693-864967735_large.mp4',
  ),

  // backend (required only in prod)
  ANNOTATIONS_FETCH_API_URL: IS_PROD
    ? envRequired('ANNOTATIONS_FETCH_API_URL')
    : env('ANNOTATIONS_FETCH_API_URL'),

  MEDIA_ASSET_FETCH_API_URL: IS_PROD
    ? envRequired('MEDIA_ASSET_FETCH_API_URL')
    : env('MEDIA_ASSET_FETCH_API_URL'),
} as const;
