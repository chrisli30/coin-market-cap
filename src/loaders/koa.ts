import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import router from '../routes';
import errorHandler from '../middlewares/error_handler';

export default ({ app }: { app: Koa }) => {
    app.use(errorHandler());

    app.use(cors());

    app.use(bodyParser());

    app.use(router.routes());

    app.use(router.allowedMethods());

    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
};
