export interface EasyTimeSeries {
    date: string;
    price: number;
}


export const convertTimeSeries = (data: any): EasyTimeSeries[] => {
    let result: EasyTimeSeries[] = [];
    const timeSeries = data["Monthly Time Series"];

    Object.keys(timeSeries).forEach((date) => {
        let item: EasyTimeSeries = {
            date: date,
            price: parseFloat(timeSeries[date]["1. open"]),
        };

        result.push(item);
    });
    
    return result.reverse();
};

export const createAlphaVantageRequestInfo = (
    stockSymbol: string
): string => {
    const PROVIDER = "https://www.alphavantage.co/";
    const API_KEY = "0PFFVYQJNUDFZX8K";
    const REQUEST_INFO = `${PROVIDER}query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`;

    return REQUEST_INFO;
};

export const computeAveragePrice = (stockData: EasyTimeSeries[]): number => {

    let prices = stockData.map((value) => value.price)
    let sum = prices.reduce((a, b) => a + b, 0)
    let average = sum / stockData.length

    return average
}
