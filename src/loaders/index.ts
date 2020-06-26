import App from '../extend/app';
import Logger from './logger';
import mongooseLoader from './mongoose';
import koaLoader from './koa';
import ExchangeRateJob from '../jobs/exchangeRate';
import CryptoCurrencyJob from '../jobs/cryptoCurrency';

export default async ({ app }: { app: App }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    // TODO
    new ExchangeRateJob(app.createEmptyContext()).run();
    new CryptoCurrencyJob(app.createEmptyContext()).run();
    Logger.info('✌️ Jobs loaded');

    await koaLoader({ app });
    Logger.info('✌️ Koa loaded');
};
