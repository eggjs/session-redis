import type { SessionRedisConfig } from './config/config.default.js';

declare module '@eggjs/core' {
  // add EggAppConfig overrides types
  interface EggAppConfig {
    sessionRedis: SessionRedisConfig;
  }
}
