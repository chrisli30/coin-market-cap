import got from 'got';

import ExchangeRateModel from '../models/exchangeRate';

export default class ExchangeRatesJob {
    public async handler(): Promise<any> {
        const appId = '0c05d662ae474d6595a81ef57c4c2958';
        const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;
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
            console.log(error);
        }
    }

    public async run(): Promise<void> {
        this.handler();
        setInterval(this.handler, 60 * 1000);
    }
}
