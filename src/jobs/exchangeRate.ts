import got from 'got';

export default class ExchangeRatesJob {
    public async run(): Promise<any> {
        const appId = '0c05d662ae474d6595a81ef57c4c2958';
        const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;
        console.log('-----------3', url);
        try {
            const res = await got.get(url);
            console.log('----------------res', res);
            return res;
        } catch (error) {
            console.log('--------------4 error', error);
            return error;
        }
    }
}
