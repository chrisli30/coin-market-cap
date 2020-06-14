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

router.all('/', async () => {
    return `coin-market-cap server is run in ${process.env.NODE_ENV}`;
});

export default router;
