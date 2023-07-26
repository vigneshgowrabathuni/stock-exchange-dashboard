export interface SearchBarProps {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (stockSymbol: string) => void;
  handleSearch: () => void;
  options: IStock[];
  searchTerm: string;
}

export interface ChartProps {
  candledData: IStockCandleData[];
  selectedStocks: string[];
}

export interface ChipProps {
  stockName: string;
  handleClick: (stockName: string) => void;
}

export interface PriceTypesProps {
  priceType: string;
  setPriceType: (value: string) => void;
}

export interface IPriceType {
  name: string;
  value: string;
}

export interface IStock {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

export interface ICandleData {
  [key: string]: number[];
}

export interface IStockCandleData {
  date: string;
  [key: string]: string;
}

export enum DateType {
  START_DATE = 'START',
  END_DATE = 'END',
}
