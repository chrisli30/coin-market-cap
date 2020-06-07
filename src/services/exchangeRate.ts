import BaseService from './base';
import ExchangeRateModel from '../models/exchangeRate';
import CryptoCurrencyeModel from '../models/cryptoCurrency';

export default class ExchangeRateService extends BaseService {
    public async getLatestExchangeRate() {
        const data = await ExchangeRateModel.findOne().sort({ createdAt: -1 });
        return data;
    }

    public async getLatestSymbolQuote() {
        const data = await CryptoCurrencyeModel.findOne().sort({ createdAt: -1 });
        return data;
    }

    public async getLatestCryptoQuote() {
        const { rates } = await this.getLatestExchangeRate();
        const supportedCurrency = ['USD', 'ARS', 'CNY', 'KRW', 'JPY', 'GBP'];
    }
}
