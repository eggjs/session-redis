import type { EggCore, ILifecycleBoot } from '@eggjs/core';

const ONE_DAY = 1000 * 60 * 60 * 24;

export default class AppBoot implements ILifecycleBoot {
  constructor(private readonly app: EggCore) {}

  async didLoad() {
    const { app } = this;
    const name = app.config.sessionRedis.name;
    const redis = name ? app.redis.getSingletonInstance(name) : app.redis;
    if (!redis) {
      throw new TypeError(`redis instance [${name}] not exists`);
    }

    /**
     * @member Application#sessionStore
     * @property {Function<string>} get - get redis session store
     * @property {Function<string, any, number?>} set - set the redis session store
     * @property {Function<string>} destroy - destroy of redis session store
     * @example
     * ```js
     * this.app.sessionStore.set('SESSION_KEY', { a: 1 }, 6000);
     * this.app.sessionStore.get('SESSION_KEY');
     * this.app.sessionStore.destroy('SESSION_KEY');
     * ```
     */
    app.sessionStore = {
      async get(key) {
        const res = await redis.get(key);
        if (!res) return null;
        return JSON.parse(res);
      },

      async set(key, value, maxAge?) {
        maxAge = typeof maxAge === 'number' ? maxAge : ONE_DAY;
        value = JSON.stringify(value);
        await redis.set(key, value, 'PX', maxAge);
      },

      async destroy(key) {
        await redis.del(key);
      },
    };
  }
}
