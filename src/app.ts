import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import Koa from 'koa';

async function startServer() {
    const app = new Koa();

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    await require('./loaders').default({ koaApp: app });

    app.listen(config.port, () => {
        console.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️ 
        ################################################
        `);
    });
}

startServer();
