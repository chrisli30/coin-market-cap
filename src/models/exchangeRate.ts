import { IExchangeRate } from '../interfaces/IExchangeRate';
import mongoose from 'mongoose';

const ExchangeRate = new mongoose.Schema(
    {
        base: {
            type: String,
            default: 'USD',
        },
        rates: {
            type: Object,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IExchangeRate & mongoose.Document>('ExchangeRate', ExchangeRate);
