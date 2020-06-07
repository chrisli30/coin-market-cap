import BaseController from './base';
import ExchangeRatesJob from '../jobs/exchangeRate';

export default class DemoController extends BaseController {
    async echo(ctx) {
        console.log('-----------zzzzzzzzdda');
        const res = await (new ExchangeRatesJob()).run();
        return res;
    }
}
