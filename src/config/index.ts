import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    env: process.env.NODE_ENV,

    port: parseInt(process.env.PORT, 10),

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    databaseURL: process.env.MONGODB_URI,

    exchangeRates: {
        host: 'https://openexchangerates.org',
        appId: process.env.EXCHANGE_RATES_APP_ID,
        interval: 3600,
    },

    cryptoCurrency: {
        host: 'https://pro-api.coinmarketcap.com',
        cmcKey: process.env.CMC_KEY,
        interval: 120,
    },

    huobi: {
        host: 'https://api.huobi.pro',
        interval: 120,
    },

    topic: {
        price: 'projects/rootstock/topics/price',
    },
};
