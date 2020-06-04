import BaseController from './base';

export default class DemoController extends BaseController {
    async echo(ctx) {
        return ctx.request.body;
    }
}
