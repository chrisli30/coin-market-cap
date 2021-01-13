import BaseService from './base';
import ExchangeRateModel from '../models/exchangeRate';
import CryptoCurrencyeModel from '../models/cryptoCurrency';
import PubSubService from './pubsub';

export default class ExchangeRateService extends BaseService {
    public async getLatestExchangeRate() {
        const data = await ExchangeRateModel.findOne().sort({ createdAt: -1 });
        return data;
    }

    public async getLatestSymbolQuote() {
        const data = await CryptoCurrencyeModel.findOne().sort({ createdAt: -1 });
        return data;
    }

    public async getLatestCryptoQuote({ rates, symbolQuotes }: { rates?: any; symbolQuotes?: any }) {
        if (!rates) {
            const resRates = await this.getLatestExchangeRate();
            rates = resRates.rates;
        }
        if (!symbolQuotes) {
            const resSymbolQuotes = await this.getLatestSymbolQuote();
            symbolQuotes = resSymbolQuotes.symbolQuotes;
        }

        if (!rates || !symbolQuotes) {
            return null;
        }

        const supportedCurrency = ['USD', 'ARS', 'CNY', 'KRW', 'JPY', 'GBP'];

        const data = symbolQuotes.map(({ symbol, quote, timestamp }) => {
            const item = {
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

    public async sendCryptoQuoteMsg({ topicName, symbolQuotes }) {
        const msgData = await this.getLatestCryptoQuote({ rates: undefined, symbolQuotes });

        if (!msgData) {
            return;
        }

        const pubSubService = new PubSubService();
        await pubSubService.publishMsg({
            topicName,
            data: msgData,
        });
    }
}
