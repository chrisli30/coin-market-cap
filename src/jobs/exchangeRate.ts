import got from 'got';

import Logger from '../loaders/logger';
import ExchangeRateModel from '../models/exchangeRate';
import BaseJob from './baseJob';

export default class ExchangeRatesJob extends BaseJob {
    public async handler(): Promise<void> {
        const { appId, host } = this.ctx.config.exchangeRates;
        const url = `${host}/api/latest.json?app_id=${appId}`;
        try {
            const { body } = await got.get(url, {
                responseType: 'json',
            });
            const { base, rates } = body as any;

            Logger.info('job: ExchangeRatesJob, url: %s, method: get, base: %s, rates: %O', url, base, rates);

            await ExchangeRateModel.create({
                base,
                rates,
            });
        } catch (error) {
            Logger.error('job: ExchangeRatesJob, url: %s, method: get, stack: %s', url, error.stack);
        }
    }

    public async run(): Promise<void> {
        const { interval } = this.ctx.config.exchangeRates;
        this.handler();
        setInterval(this.handler.bind(this), interval * 1000);
    }
}
