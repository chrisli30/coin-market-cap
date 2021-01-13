import got from 'got';
import querystring from 'querystring';
import BigNumber from 'bignumber.js';

import Logger from '../loaders/logger';
import CryptoCurrencyeModel from '../models/cryptoCurrency';
import BaseJob from './baseJob';
import CryptoRateService from '../services/cryptoRate';

export default class KucoinJob extends BaseJob {
    public constructor(app) {
        super(app);
    }

    public async handler(): Promise<any> {
        try {
            const priceBTC = await this.getBTCUSDPrice();
            const priceRBTCPair = await this.getBTCPairPrice('RBTC');
            const priceRIFPair = await this.getBTCPairPrice('RIF');

            const timestamp = Date.now();
            const symbolQuotes = [
                {
                    symbol: 'BTC',
                    quote: {
                        USD: {
                            price: new BigNumber(priceBTC).toNumber(),
                        },
                    },
                    timestamp,
                },
                {
                    symbol: 'RBTC',
                    quote: {
                        USD: {
                            price: new BigNumber(priceBTC).multipliedBy(priceRBTCPair).toNumber(),
                        },
                    },
                    timestamp,
                },
                {
                    symbol: 'RIF',
                    quote: {
                        USD: {
                            price: new BigNumber(priceBTC).multipliedBy(priceRIFPair).toNumber(),
                        },
                    },
                    timestamp,
                },
            ];

            await CryptoCurrencyeModel.create({
                symbolQuotes,
            });

            const cryptoRateService = new CryptoRateService();
            await cryptoRateService.sendCryptoQuoteMsg({
                topicName: this.app.config.topic.price,
                symbolQuotes,
            });
        } catch (error) {
            Logger.error('job: KucoinJob, stack: %s', error.stack);
        }
    }

    public async getBTCPairPrice(symbol) {
        const params = querystring.stringify({
            symbols: `${symbol}-BTC`,
        });
        const { data } = await this.fetch({
            action: `/_api/trade-front/market/getSymbolTick?${params}`,
        });
        const symbolBTCPrice = data[0].lastTradedPrice;

        return symbolBTCPrice;
    }

    public async getBTCUSDPrice() {
        const params = querystring.stringify({
            legal: 'USD',
            side: 'BUY',
            currency: 'BTC',
        });
        const { data } = await this.fetch({
            action: `/_api/otc/quotes/bestPrice?${params}`,
        });

        return data;
    }

    public async fetch({ action }) {
        const { host } = this.app.config.kucoin;
        const url = `${host}${action}`;

        const { body }: any = await got.get(url, {
            responseType: 'json',
        });

        Logger.info('job: KucoinJob, url: %s, method: get, body: %O', url, body);

        return body;
    }

    public async run(): Promise<void> {
        const { interval } = this.app.config.kucoin;
        this.handler();
        setInterval(this.handler.bind(this), interval * 1000);
    }
}
