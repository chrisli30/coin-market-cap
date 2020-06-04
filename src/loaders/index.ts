import koaLoader from './koa';

export default async ({ koaApp }) => {
    await koaLoader({ app: koaApp });
};
