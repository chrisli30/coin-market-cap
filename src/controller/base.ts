import Koa from 'koa';

export default class BaseController {
    ctx: Koa.Context;

    constructor(ctx: Koa.Context) {
        this.ctx = ctx;
    }

    ok(data) {
        this.ctx.body = {
            code: '',
            success: true,
            data,
        }
    }

    fail(error) {
        this.ctx.body = {

        }
    }
}
