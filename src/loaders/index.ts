import mongooseLoader from './mongoose';
import koaLoader from './koa';
import ExchangeRateJob from '../jobs/exchangeRate';

export default async ({ koaApp }) => {
    const mongoConnection = await mongooseLoader();

    // TODO
    // new ExchangeRateJob().run();

    await koaLoader({ app: koaApp });
};
