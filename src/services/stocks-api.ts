import axios from 'axios';

const baseUrl = 'https://finnhub.io/api/v1';
const api_key = 'ciu0gq9r01qvfma1g6hgciu0gq9r01qvfma1g6i0';

export const fetchStocksList = async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/stock/symbol?exchange=US&token=${api_key}`
    );
    return data;
  } catch (error) {
    console.log('Error while getting the stocks list');
  }
};

export const fetchStockCandlesData = async (
  stockSymbol: string,
  from: number,
  to: number
) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/stock/candle?symbol=${stockSymbol}&resolution=D&from=${from}&to=${to}&token=${api_key}`
    );
    return data;
  } catch (error) {
    console.log('Error while getting the candles data');
  }
};
