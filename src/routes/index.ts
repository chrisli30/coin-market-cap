import Router from '@koa/router';

import DemoController from '../controller/demo';

const router = new Router();

router.all('/', async (ctx) => {
    const controller = new DemoController(ctx);
    console.log('----------route index');
    ctx.body = { name: 'pony' };
});

export default router;
