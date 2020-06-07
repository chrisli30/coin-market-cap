import BaseController from './base';
import ExchangeRateService from '../services/exchangeRate';

export default class CryptoRateController extends BaseController {
    async getLatestExchangeRate(ctx) {
        const service = new ExchangeRateService(ctx);
        const { base, rates, } = await service.getLatestExchangeRate();
        return { base, rates, };
    }

    async getLatestCryptoCurrency(ctx) {
        const service = new ExchangeRateService(ctx);
        const { rates, } = await service.getLatestExchangeRate();

       
        // return { base, rates, };
    }
}
