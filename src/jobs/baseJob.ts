import App from '../extend/app';

export default class BaseJob {
    protected ctx: App.Context;

    constructor(ctx: App.Context) {
        this.ctx = ctx;
    }
}
