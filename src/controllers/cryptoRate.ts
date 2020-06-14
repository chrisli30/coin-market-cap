import BaseController from './base';
import CryptoRateService from '../services/cryptoRate';

export default class CryptoRateController extends BaseController {
    async getLatestExchangeRate(ctx) {
        const service = new CryptoRateService(ctx);
        const { base, rates } = await service.getLatestExchangeRate();
        return { base, rates };
    }

    async getLatestCryptoCurrency(ctx) {
        const service = new CryptoRateService(ctx);
        const data = await service.getLatestCryptoQuote();
        return data;
    }
}
