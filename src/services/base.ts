import Koa from 'koa';

export default class BaseService {
    ctx: Koa.Context;

    constructor(ctx?: Koa.Context) {
        this.ctx = ctx;
    }
}
