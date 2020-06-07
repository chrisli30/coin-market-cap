export interface IExchangeRate {
    _id: string;
    base: string;
    rates: object;
}

export interface IExchangeRateInputDTO {
    base: string;
    rates: object;
}
