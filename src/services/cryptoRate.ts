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
        const { symbolQuotes } = await this.getLatestSymbolQuote();

        const supportedCurrency = ['USD', 'ARS', 'CNY', 'KRW', 'JPY', 'GBP'];

        const data = symbolQuotes.map(({ id, symbol, quote, timestamp }) => {
            const item = {
                id,
                symbol,
                price: {},
                timestamp,
            };
            const baseCurrency = quote['USD'].price;
            supportedCurrency.forEach(currency => {
                if (!rates[currency]) {
                    return;
                }

                item.price[currency] = rates[currency] * baseCurrency;
            });

            return item;
        });

        return data;
    }
}
