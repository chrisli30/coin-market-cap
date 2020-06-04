import Router from '@koa/router';

import DemoController from '../controller/demo';

const router = new Router();

router.all('/', async (ctx) => {
    const controller = new DemoController(ctx);
    ctx.body = await controller.echo(ctx);
});

export default router;
