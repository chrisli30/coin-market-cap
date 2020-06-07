import Router from '@koa/router';

import CryptoRateController from '../controller/cryptoRate';

const router = new Router();

router.get('/v1/exchangerates', async (ctx) => {
    const controller = new CryptoRateController(ctx);
    return await controller.getLatestExchangeRate(ctx);
});

router.get('/v1/cryptocurrencies', async (ctx) => {
    const controller = new CryptoRateController(ctx);
    return await controller.getLatestExchangeRate(ctx);
});

export default router;
