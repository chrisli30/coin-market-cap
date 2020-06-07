import BaseService from './base';
import ExchangeRateModel from '../models/exchangeRate';

export default class ExchangeRateService extends BaseService {
    public async getLatestExchangeRate() {
        const data = await ExchangeRateModel.findOne().sort({ createdAt: -1 });
        return data;
    }

}
