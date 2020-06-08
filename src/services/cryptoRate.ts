import { PubSub } from '@google-cloud/pubsub';

import BaseService from './base';
import ExchangeRateModel from '../models/exchangeRate';
import CryptoCurrencyeModel from '../models/cryptoCurrency';

const pubSubClient = new PubSub();

export default class ExchangeRateService extends BaseService {
    async publishMessage(data) {
        console.log('---zzzzz---');
        const topicName = 'projects/rootstock/topics/my-topic';
        const dataBuffer = Buffer.from(JSON.stringify(data));

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    }

    public async getLatestExchangeRate() {
        // const data = await ExchangeRateModel.findOne().sort({ createdAt: -1 });
        const data = {
            "base": "USD",
            "rates": {
                "AED": 3.672942,
                "AFN": 77.47903,
                "ALL": 110.00023,
            }
        };
        this.publishMessage(data).catch((err) => {
            console.log('publishMessage err', err)
        });
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

        const data = symbolQuotes.map(({ id, symbol, quote }) => {
            const item = {
                id,
                symbol,
                price: {},
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
