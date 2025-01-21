import { scheduler } from 'node:timers/promises';
import { TestAgent } from '@eggjs/supertest';
import assert from 'node:assert';
import { mm, MockApplication } from '@eggjs/mock';
import snapshot from 'snap-shot-it';

describe('test/app.test.ts', () => {
  [
    'single',
    'multi',
    'ts',
  ].forEach(name => {
    describe(name, () => {
      let app: MockApplication;
      let agent: TestAgent;
      before(() => {
        app = mm.app({
          baseDir: name,
        });
        return app.ready();
      });
      beforeEach(() => {
        agent = new TestAgent(app.callback());
      });
      afterEach(mm.restore);
      after(() => app.close());

      if (name === 'single') {
        it('should keep config stable', () => {
          snapshot(app.config.sessionRedis);
        });
      }

      it('should get empty session and do not set cookie when session not populated', async () => {
        await agent
          .get('/get')
          .expect(200)
          .expect({})
          .expect(res => {
            assert(!res.get('Set-Cookie')!.join('').match(/EGG_SESS/));
          });
      });

      it('should ctx.session= change the session', async () => {
        await agent
          .get('/set?foo=bar')
          .expect(200)
          .expect({ foo: 'bar' })
          .expect('set-cookie', /EGG_SESS=.*?;/);
      });

      it('should ctx.session.key= change the session', async () => {
        await agent
          .get('/set?key=foo&foo=bar')
          .expect(200)
          .expect({ key: 'foo', foo: 'bar' })
          .expect('set-cookie', /EGG_SESS=.*?;/);

        await agent
          .get('/setKey?key=bar')
          .expect(200)
          .expect({ key: 'bar', foo: 'bar' })
          .expect('set-cookie', /EGG_SESS=.*?;/);
      });

      it('should ctx.session=null remove the session', async () => {
        await agent
          .get('/set?key=foo&foo=bar')
          .expect(200)
          .expect({ key: 'foo', foo: 'bar' })
          .expect('set-cookie', /EGG_SESS=.*?;/);

        await agent
          .get('/remove')
          .expect(204)
          .expect('set-cookie', /EGG_SESS=;/);

        await agent
          .get('/get')
          .expect(200)
          .expect({});
      });

      it('should ctx.session.maxAge= change maxAge', async () => {
        await agent
          .get('/set?key=foo&foo=bar')
          .expect(200)
          .expect({ key: 'foo', foo: 'bar' })
          .expect('set-cookie', /EGG_SESS=.*?;/);

        let cookie = '';

        await agent
          .get('/maxAge?maxAge=100')
          .expect(200)
          .expect({ key: 'foo', foo: 'bar' })
          .expect(res => {
            cookie = res.get('Set-Cookie')!.join(';');
            assert(cookie.match(/EGG_SESS=.*?;/));
            assert(cookie.match(/expires=/));
          });

        await scheduler.wait(200);

        await agent
          .get('/get')
          .expect(200)
          .expect({});

        await app.httpRequest()
          .get('/get')
          .set('cookie', cookie)
          .expect(200)
          .expect({});
      });
    });
  });
});
