import { ICryptoCurrency } from '../interfaces/ICryptoCurrency';
import mongoose from 'mongoose';

const CryptoCurrency = new mongoose.Schema(
    {
        symbolQuotes: {
            type: Array,
        },
    },
    { timestamps: true },
);

export default mongoose.model<ICryptoCurrency & mongoose.Document>('CryptoCurrency', CryptoCurrency, 'crypto_currency');
