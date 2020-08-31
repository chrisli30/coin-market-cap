import BigNumber from 'bignumber.js';

import BaseController from './base';
import CryptoRateService from '../services/cryptoRate';
import CryptoCurrencyService from '../services/cryptoCurrency';

export default class CryptoRateController extends BaseController {
    async getLatestExchangeRate(ctx) {
        const service = new CryptoRateService(ctx);
        const { base, rates } = await service.getLatestExchangeRate();
        return { base, rates };
    }

    async getLatestCryptoCurrency(ctx) {
        const service = new CryptoRateService(ctx);
        const data = await service.getLatestCryptoQuote({});
        return data;
    }

    async getTxPair(ctx) {
        const { pair, timestamp } = ctx.query;
        const [symbol, currency] = pair.split('/');
        if (!symbol || !currency) {
            throw new Error('pair is wrong');
        }

        const cryptoRateService = new CryptoRateService(ctx);
        const { rates } = await cryptoRateService.getLatestExchangeRate();
        if (!Object.keys(rates).includes(currency)) {
            throw new Error(`not support ${currency}`);
        }

        const cryptoCurrencyService = new CryptoCurrencyService(ctx);
        const priceOfUSD = await cryptoCurrencyService.getTxPair({ symbol, timestamp });
        const price = new BigNumber(rates[currency]).multipliedBy(priceOfUSD).toFixed(6);

        return { price };
    }
}
