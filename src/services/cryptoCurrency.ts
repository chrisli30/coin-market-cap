import got from 'got';
import querystring from 'querystring';
import moment from 'moment';

import BaseService from './base';
import Logger from '../loaders/logger';

export default class CryptoCurrencyService extends BaseService {
    public async getOhlcv({ symbol, startTime, endTime, timePeriod }) {
        const params = querystring.stringify({
            symbol,
            time_start: startTime,
            time_end: endTime,
            time_period: timePeriod,
        });

        const { data } = await this.fetch({
            action: `/v1/cryptocurrency/ohlcv/historical?${params}`,
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

        Logger.info('CryptoCurrencyService, url: %s, method: get, body: %O', url, body);

        return body;
    }

    public async getTxPair({ symbol, timestamp }) {
        const startTime = moment(timestamp).subtract(1, 'day').format('YYYY-MM-DD');
        const endTime = moment(timestamp).format('YYYY-MM-DD');

        const data = await this.getOhlcv({
            symbol,
            startTime,
            endTime,
            timePeriod: 'daily',
        });

        const price = data.quotes[0].quote.USD.close;

        return price;
    }
}   
