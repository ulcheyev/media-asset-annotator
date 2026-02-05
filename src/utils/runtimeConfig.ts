// Prefix for Vite-exposed variables
const VITE_ENV_PREFIX = 'ANNOTATOR_';
export const APP_MODES = ["demo", "dev", "prod"] as const;

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

/**
 * Strongly-typed env accessor
 */
function getEnv<T extends string>(
  name: T,
  options?: {
    defaultValue?: string;
    required?: boolean;
  },
): string {
  const value = ENV[name];

  if (options?.defaultValue !== undefined) {
    return options.defaultValue;
  }

  if (options?.required) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  if (import.meta.env.DEV) {
    console.warn(`Environment variable "${name}" is not defined. Using undefined.`);
    return value;
  } else {
    throw new Error(`Environment variable "${name}" is not defined`);
  }
}

function getEnumEnv<T extends readonly string[]>(
    name: string,
    allowedValues: T,
    options?: {
      defaultValue?: T[number];
      required?: boolean;
    }
): T[number] {
  const raw = getEnv(name, {
    defaultValue: options?.defaultValue,
    required: options?.required,
  });

  if (!raw) {
    if (options?.defaultValue !== undefined) {
      return options.defaultValue;
    }
    throw new Error(`Missing environment variable: ${name}`);
  }

  if ((allowedValues as readonly string[]).includes(raw)) {
    return raw as T[number];
  }

  throw new Error(
      `Invalid value for ${name}: "${raw}". Allowed values: ${allowedValues.join(", ")}`
  );
}


export const runtimeConfig = {

  APP_MODE: getEnumEnv("APP_MODE", APP_MODES, {
    defaultValue: import.meta.env.DEV ? "dev" : "prod",
  }),

  USE_MOCK_DATA: import.meta.env.DEV || getEnumEnv("APP_MODE", APP_MODES) === "demo",

  DEMO_MEDIA_URL: getEnv('DEMO_MEDIA_URL', {
    defaultValue: 'https://cdn.pixabay.com/video/2023/09/15/180693-864967735_large.mp4',
  }),

  ANNOTATIONS_FETCH_API_URL: getEnv('ANNOTATIONS_FETCH_API_URL', {
    required: false,
  }),

  MEDIA_ASSET_FETCH_API_URL: getEnv('MEDIA_ASSET_FETCH_API_URL', {
    required: false,
  }),

  BASE_PATH: getEnv('BASE_PATH', {
    defaultValue: '/',
  }),
} as const;
