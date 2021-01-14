import got from 'got';
import querystring from 'querystring';

import Logger from '../loaders/logger';
import CryptoCurrencyeModel from '../models/cryptoCurrency';
import BaseJob from './baseJob';
import CryptoRateService from '../services/cryptoRate';

export default class BinanceJob extends BaseJob {
    symbols: string[];

    public constructor(app) {
        super(app);
        this.symbols = ['BTC', 'ETH', 'DOT'];
    }

    public async handler(): Promise<any> {
        try {
            const symbolQuotes = [];
            await Promise.all(this.symbols.map(async symbol => {
                const symbolPrice = await this.getUSDTPairPrice(symbol);
                const item = {
                    symbol,
                    quote: {
                        USD: {
                            price: symbolPrice,
                        },
                    },
                    timestamp: Date.now(),
                };
                symbolQuotes.push(item);
            }));

            await CryptoCurrencyeModel.create({
                symbolQuotes,
            });

            const cryptoRateService = new CryptoRateService();
            await cryptoRateService.sendCryptoQuoteMsg({
                topicName: this.app.config.topic.price,
                symbolQuotes,
            });
        } catch (error) {
            Logger.error('job: BinanceJob, stack: %s', error.stack);
        }
    }

    public async getUSDTPairPrice(symbol) {
        const params = querystring.stringify({
            symbol: `${symbol}USDT`,
        });
        const { price } = await this.fetch({
            action: `/api/v3/ticker/price?${params}`,
        });

        return Number(price);
    }

    public async fetch({ action }) {
        const { host } = this.app.config.binance;
        const url = `${host}${action}`;

        const { body }: any = await got.get(url, {
            responseType: 'json',
        });

        Logger.info('job: BinanceJob, url: %s, method: get, body: %O', url, body);

        return body;
    }

    public async run(): Promise<void> {
        const { interval } = this.app.config.binance;
        this.handler();
        setInterval(this.handler.bind(this), interval * 1000);
    }
}
