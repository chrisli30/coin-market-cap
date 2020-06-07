import got from 'got';

export default class ExchangeRatesJob {
    public async run(ctx): Promise<any> {
        const appId = '0c05d662ae474d6595a81ef57c4c2958';
        const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;
        console.log('-----------3', url);
        const res = await got.get('https://www.baidu.com/');
        console.log('----------------res', res);
        return res;
    }
}
