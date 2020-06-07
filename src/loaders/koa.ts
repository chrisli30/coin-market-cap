import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import router from '../routes';
import errorHandler from '../middlewares/errorHandler';

export default ({ app }: { app: Koa }) => {
    app.use(cors());

    app.use(bodyParser());

    app.use(errorHandler());

    app.use(router.routes());

    app.use(router.allowedMethods());
};
