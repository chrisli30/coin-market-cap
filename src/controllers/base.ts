import Koa from 'koa';

export default class BaseController {
    ctx: Koa.Context;

    constructor(ctx?: Koa.Context) {
        this.ctx = ctx;
    }
}
