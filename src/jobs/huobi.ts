import got from 'got';
import querystring from 'querystring';

import Logger from '../loaders/logger';
import CryptoCurrencyeModel from '../models/cryptoCurrency';
import BaseJob from './baseJob';
import CryptoRateService from '../services/cryptoRate';

export default class HuobiJob extends BaseJob {
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
            Logger.error('job: HuobiJob, stack: %s', error.stack);
        }
    }

    public async getUSDTPairPrice(symbol) {
        const params = querystring.stringify({
            symbol: `${symbol.toLowerCase()}usdt`,
        });
        const { tick } = await this.fetch({
            action: `/market/detail/merged?${params}`,
        });
        const symbolUSDTPrice = tick.close;

        return symbolUSDTPrice;
    }

    public async fetch({ action }) {
        const { host } = this.app.config.huobi;
        const url = `${host}${action}`;

        const { body }: any = await got.get(url, {
            responseType: 'json',
        });

        Logger.info('job: HuobiJob, url: %s, method: get, body: %O', url, body);

        return body;
    }

    public async run(): Promise<void> {
        const { interval } = this.app.config.huobi;
        this.handler();
        setInterval(this.handler.bind(this), interval * 1000);
    }
}
