import BaseService from './base';
import ExchangeRateModel from '../models/exchangeRate';

export default class ExchangeRateService extends BaseService {
    public async save() {
        const res = await ExchangeRateModel.create({
            base: 'USD',
            rates: {
                AED: 3.673,
                AFN: 77.349999,
            },
        });

        return res;
    }

}
