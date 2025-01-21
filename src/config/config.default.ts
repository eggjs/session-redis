/**
 * session-redis default config
 * @member Config#sessionRedis
 * @property {String} name - redis instance name
 */
export interface SessionRedisConfig {
  /**
   * redis instance name
   *
   * Default to `''`, use `app.redis` for session store
   *
   * If name present, use `app.redis.getSingletonInstance(name)` for session store
   */
  name: string;
}

export default {
  sessionRedis: {
    name: '',
  } as SessionRedisConfig,
};
