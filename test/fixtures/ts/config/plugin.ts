import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  redis: {
    enable: true,
    package: '@eggjs/redis',
  }
};

export default plugin;
