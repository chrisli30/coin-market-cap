import BaseController from './base';
import ExchangeRateJob from '../jobs/exchangeRate';
import ExchangeRateService from '../services/exchangeRate';

export default class DemoController extends BaseController {
    async echo(ctx) {
        console.log('-------------1');
        const service = new ExchangeRateService(ctx);
        const res = await service.save();
        console.log('-------------2', res);
        return res;
    }
}
