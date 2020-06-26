import got from 'got';
import querystring from 'querystring';

import Logger from '../loaders/logger';
import CryptoCurrencyeModel from '../models/cryptoCurrency';
import BaseJob from './baseJob';
import CryptoRateService from '../services/cryptoRate';

const symbols = ['BTC', 'RBTC', 'RIF'];
const baseCurrency = 'USD';

export default class CryptoCurrencyJob extends BaseJob {
    symbolIds: { [name: string]: any }[];

    public async handler(): Promise<any> {
        try {
            if (!this.symbolIds) {
                const symbolIds = await this.getTokenIds();
                this.symbolIds = symbolIds;
            }

            const resQuotes = await this.getTokenQuotes();
            this.symbolIds.forEach(item => {
                const { id } = item;
                const quote = resQuotes[id].quote;
                item.quote = quote;
                item.timestamp = Date.now();
            });

            await CryptoCurrencyeModel.create({
                symbolQuotes: this.symbolIds,
            });

            const cryptoRateService = new CryptoRateService();
            await cryptoRateService.sendCryptoQuoteMsg({
                topicName: this.ctx.config.topic.price,
                symbolQuotes: this.symbolIds,
            });
        } catch (error) {
            Logger.error('job: CryptoCurrencyJob, stack: %s', error.stack);
        }
    }

    public async getTokenIds() {
        const params = querystring.stringify({ symbol: symbols.join(',') });
        const resSymbolIds = await this.fetch({
            action: `/v1/cryptocurrency/map?${params}`,
        });

        const symbolIds = resSymbolIds.data.map(({ id, symbol }) => ({
            id,
            symbol,
        }));

        return symbolIds;
    }

    public async getTokenQuotes() {
        const idStr = this.symbolIds.map(({ id }) => id).join(',');
        const params = querystring.stringify({
            id: idStr,
            convert: baseCurrency,
        });

        const { data } = await this.fetch({
            action: `/v1/cryptocurrency/quotes/latest?${params}`,
        });

        return data;
    }

    public async fetch({ action }) {
        const { cmcKey, host } = this.ctx.config.cryptoCurrency;
        const url = `${host}${action}`;
        const headers = {
            'X-CMC_PRO_API_KEY': cmcKey,
        };

        const { body }: any = await got.get(url, {
            headers,
            responseType: 'json',
        });

        Logger.info('job: CryptoCurrencyJob, url: %s, method: get, body: %O', url, body);

        return body;
    }

    public async run(): Promise<void> {
        const { interval } = this.ctx.config.cryptoCurrency;
        this.handler();
        setInterval(this.handler.bind(this), interval * 1000);
    }
}
