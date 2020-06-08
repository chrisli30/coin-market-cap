import Logger from './logger';
import mongooseLoader from './mongoose';
import koaLoader from './koa';
import ExchangeRateJob from '../jobs/exchangeRate';
import CryptoCurrencyJob from '../jobs/cryptoCurrency';

export default async ({ koaApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    // TODO
    new ExchangeRateJob().run();
    // new CryptoCurrencyJob().run();
    Logger.info('✌️ Jobs loaded');

    await koaLoader({ app: koaApp });
    Logger.info('✌️ Koa loaded');
};
