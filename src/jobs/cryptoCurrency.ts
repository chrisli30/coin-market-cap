import got from 'got';
import { PubSub } from '@google-cloud/pubsub';

import config from '../config';
import Logger from '../loaders/logger';
import CryptoCurrencyeModel from '../models/cryptoCurrency';

export default class CryptoCurrencyJob {
    public async handler(): Promise<any> {
        const { cmcKey, host } = config.cryptoCurrency;
        const url = `${host}/v1/cryptocurrency/quotes/latest?id=1%2C3626%2C3701&convert=USD`;
        const headers = {
            'X-CMC_PRO_API_KEY': cmcKey,
        };

        // mock data
        const symbolIds: any = [{
            id: 1,
            symbol: 'BTC',
        }, {
            id: 3626,
            symbol: 'RBTC',
        }, {
            id: 3701,
            symbol: 'RIF',
        },];

        try {
            const { body }: any = await got.get(url, {
                headers,
                responseType: 'json',
            });

            symbolIds.forEach(item => {
                const { id } = item;
                const quote = body.data[id].quote;
                item.quote = quote;
            });

            await CryptoCurrencyeModel.create({
                symbolQuotes: symbolIds,
            });

            // TODO send msg to mq

        } catch (error) {
            Logger.error(
                'job: CryptoCurrencyJob, url: %s, method: get, reqHeader: %O, stack: %s',
                url,
                headers,
                error.stack,
            );
        }
    }

    public async run(): Promise<void> {
        this.handler();
        setInterval(this.handler, 60 * 1000);
    }
}
