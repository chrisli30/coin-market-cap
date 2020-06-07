import got from 'got';

import CryptoCurrencyeModel from '../models/cryptoCurrency';

export default class CryptoCurrencyJob {
    public async handler(): Promise<any> {
        // const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?symbol=BTC%2CRBTC%2CRIF`;
        const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1%2C3626%2C3701&convert=USD';
        const cmcKey = '171c51ce-88dd-4562-8500-97c185d022bd';

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
                headers: {
                    'X-CMC_PRO_API_KEY': cmcKey,
                },
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
            console.log(error);
        }
    }

    // get symbol Id


    public async run(): Promise<void> {
        this.handler();
        setInterval(this.handler, 60 * 1000);
    }
}
