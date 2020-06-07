import Router from '@koa/router';

import DemoController from '../controller/demo';

const router = new Router();

router.all('/', async (ctx) => {
    const controller = new DemoController(ctx);
    return await controller.echo(ctx);
});

export default router;
