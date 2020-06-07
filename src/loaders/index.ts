import mongooseLoader from './mongoose';
import koaLoader from './koa';
import ExchangeRateJob from '../jobs/exchangeRate';
import CryptoCurrencyJob from '../jobs/cryptoCurrency';

export default async ({ koaApp }) => {
    const mongoConnection = await mongooseLoader();

    // TODO
    // new ExchangeRateJob().run();
    new CryptoCurrencyJob().run();

    await koaLoader({ app: koaApp });
};
