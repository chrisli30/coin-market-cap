import { PubSub } from '@google-cloud/pubsub';

import BaseService from './base';
import ExchangeRateModel from '../models/exchangeRate';
import CryptoCurrencyeModel from '../models/cryptoCurrency';

const pubSubClient = new PubSub();

async function listenForMessages() {
    const subscriptionName = 'projects/rootstock/subscriptions/my-topic-sub';
    const subscription = pubSubClient.subscription(subscriptionName);

    // Create an event handler to handle messages
    const messageHandler = message => {
        console.log(`Received message ${message.id}:`);
        console.log(`\tData: ${message.data}`, typeof message.data);
        console.log(`\tAttributes: ${message.attributes}`);

        // "Ack" (acknowledge receipt of) the message
        message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);
}

listenForMessages();

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
        const data = [
            {
                "id": 1,
                "symbol": "BTC",
                "price": {
                    "USD": 9752.95575113,
                    "ARS": 673961.856287115,
                },
            },
            {
                "id": 3626,
                "symbol": "RBTC",
                "price": {
                    "USD": 9728.55750445,
                    "ARS": 672275.85585379,
                }
            },
            {
                "id": 3701,
                "symbol": "RIF",
                "price": {
                    "USD": 0.0857786449954,
                    "ARS": 5.927591212971,
                }
            }
        ];
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
        // const { rates } = await this.getLatestExchangeRate();
        // const { symbolQuotes } = await this.getLatestSymbolQuote();

        // const supportedCurrency = ['USD', 'ARS', 'CNY', 'KRW', 'JPY', 'GBP'];

        // const data = symbolQuotes.map(({ id, symbol, quote }) => {
        //     const item = {
        //         id,
        //         symbol,
        //         price: {},
        //     };
        //     const baseCurrency = quote['USD'].price;
        //     supportedCurrency.forEach(currency => {
        //         if (!rates[currency]) {
        //             return;
        //         }

        //         item.price[currency] = rates[currency] * baseCurrency;
        //     });

        //     return item;
        // });

        // return data;


    }
}
