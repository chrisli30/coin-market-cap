import BaseController from './base';
import ExchangeRateJob from '../jobs/exchangeRate';

export default class DemoController extends BaseController {
    async echo(ctx) {
        console.log('-------------1');
        const { body } = await (new ExchangeRateJob()).run(ctx);
        console.log('-------------2', body);
        return body;
    }
}
