import { ICandleData } from '../types';

export const formatData = (
  data: ICandleData,
  priceType: string,
  stockSymbol: string
) => {
  return data[priceType].map((item: number, index: number) => {
    return {
      [stockSymbol]: item.toFixed(2),
      date: new Date(data.t[index] * 1000).toLocaleDateString(),
    };
  });
};

export const formatDate = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
