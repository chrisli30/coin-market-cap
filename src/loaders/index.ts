import Logger from './logger';
import mongooseLoader from './mongoose';
import koaLoader from './koa';
import ExchangeRateJob from '../jobs/exchangeRate';
// import CryptoCurrencyJob from '../jobs/cryptoCurrency';
import HuobiJob from '../jobs/huobi';

export default async ({ koaApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    // TODO
    new ExchangeRateJob(koaApp).run();
    // new CryptoCurrencyJob(koaApp).run();
    new HuobiJob(koaApp).run();
    Logger.info('✌️ Jobs loaded');

    await koaLoader({ app: koaApp });
    Logger.info('✌️ Koa loaded');
};
