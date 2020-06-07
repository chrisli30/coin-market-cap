import got from 'got';

import config from '../config';
import Logger from '../loaders/logger';
import ExchangeRateModel from '../models/exchangeRate';

export default class ExchangeRatesJob {
    public async handler(): Promise<any> {
        const { appId, host } = config.exchangeRates;
        const url = `${host}/api/latest.json?app_id=${appId}`;
        try {
            const { body } = await got.get(url, {
                responseType: 'json',
            });
            const { base, rates } = body as any;

            await ExchangeRateModel.create({
                base, rates,
            });

            // TODO send msg to mq

        } catch (error) {
            Logger.error(
                'job: ExchangeRatesJob, url: %s, method: get, stack: %s',
                url,
                error.stack,
            );
        }
    }

    public async run(): Promise<void> {
        this.handler();
        setInterval(this.handler, 60 * 1000);
    }
}
