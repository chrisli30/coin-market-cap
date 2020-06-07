import mongooseLoader from './mongoose';
import koaLoader from './koa';

export default async ({ koaApp }) => {
    const mongoConnection = await mongooseLoader();

    await koaLoader({ app: koaApp });
};
