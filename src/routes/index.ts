import Router from '@koa/router';

import CryptoRateController from '../controllers/cryptoRate';

const router = new Router();

router.get('/v1/exchangerate', async (ctx) => {
    const controller = new CryptoRateController(ctx);
    return await controller.getLatestExchangeRate(ctx);
});

router.get('/v1/cryptocurrency', async (ctx) => {
    const controller = new CryptoRateController(ctx);
    return await controller.getLatestCryptoCurrency(ctx);
});

export default router;
