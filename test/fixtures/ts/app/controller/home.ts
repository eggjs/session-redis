import { Controller } from 'egg';

// add home controller
declare module 'egg' {
  interface IController {
    home: HomeController;
  }

  interface Context {
    [key: string | symbol]: any;
  }
}

export default class HomeController extends Controller {
  async get () {
    this.ctx.body = this.ctx.session;
  };

  async set () {
    this.ctx.session = this.ctx.query;
    this.ctx.body = this.ctx.session;
  };

  async setKey () {
    this.ctx.session.key = this.ctx.query.key;
    this.ctx.body = this.ctx.session;
  };

  async remove () {
    this.ctx.session = null;
    this.ctx.body = this.ctx.session;
  };

  async maxAge () {
    this.ctx.session.maxAge = Number(this.ctx.query.maxAge);
    this.ctx.body = this.ctx.session;
  };
}
