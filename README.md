# @eggjs/session-redis

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/eggjs/session-redis/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eggjs/session-redis/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
[![Node.js Version](https://img.shields.io/node/v/@eggjs/session-redis.svg?style=flat)](https://nodejs.org/en/download/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/eggjs/session-redis)

[npm-image]: https://img.shields.io/npm/v/@eggjs/session-redis.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@eggjs/session-redis
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/session-redis.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/session-redis?branch=master
[snyk-image]: https://snyk.io/test/npm/@eggjs/session-redis/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@eggjs/session-redis
[download-image]: https://img.shields.io/npm/dm/@eggjs/session-redis.svg?style=flat-square
[download-url]: https://npmjs.org/package/@eggjs/session-redis

A session extension for store session in redis.

## Install

```bash
npm i @eggjs/session-redis @eggjs/redis
```

## Usage

This module dependent on [@eggjs/redis](https://github.com/eggjs/redis) plugin, so we must enable both.

```js
// {app_root}/config/plugin.js
exports.sessionRedis = {
  enable: true,
  package: '@eggjs/session-redis',
};

exports.redis = {
  enable: true,
  package: '@eggjs/redis',
};
```

## Configuration

If we only have one redis instance:

```js
// {app_root}/config/config.default.js
exports.redis = {
  client: {
    host: 'your redis host',
    port: 'your redis port',
    password: '',
    db: '0',
  },
  agent:true
};
// no need to set any sessionRedis config
```

If we have more than one redis instance, we need to configure which instance to be used as session store.

```js
// {app_root}/config/config.default.js

exports.redis = {
  clients: {
    session: { /* config */ },
    cache: { /* config */ },
  },
};

exports.sessionRedis = {
  name: 'session', // specific instance `session` as the session store
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

## Contributors

[![Contributors](https://contrib.rocks/image?repo=eggjs/session-redis)](https://github.com/eggjs/session-redis/graphs/contributors)

Made with [contributors-img](https://contrib.rocks).
