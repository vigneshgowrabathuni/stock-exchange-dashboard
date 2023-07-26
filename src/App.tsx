import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import Chart from './components/Chart/Chart';
import { fetchStockCandlesData, fetchStocksList } from './services/stocks-api';
import Chip from './components/Chip/Chip';
import PriceTypes from './components/PriceTypes/PriceTypes';
import { formatData, formatDate } from './utils';
import { DateType, IStock, IStockCandleData } from './types';
import './App.scss';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [options, setOptions] = useState<IStock[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [candlesData, setCandlesData] = useState<IStockCandleData[]>([]);
  const [priceType, setPriceType] = useState<string>('o');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchStocksList();
        setStocks(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedStocks.length > 0 && startDate && endDate) {
      (async () => {
        let stockData1: IStockCandleData[] = [];
        let stockData2: IStockCandleData[] = [];
        let stockData3: IStockCandleData[] = [];

        for (let i = 0; i < selectedStocks.length; i++) {
          try {
            const data = await fetchStockCandlesData(
              selectedStocks[i],
              formatDate(startDate),
              formatDate(endDate)
            );
            if (i === 0) {
              stockData1 = formatData(data, priceType, selectedStocks[i]);
            } else if (i === 1) {
              stockData2 = formatData(data, priceType, selectedStocks[i]);
            } else {
              stockData3 = formatData(data, priceType, selectedStocks[i]);
            }
          } catch (error) {
            console.log(error);
          }
        }

        const fData = stockData1.map((stock: IStockCandleData, i: number) => {
          if (stockData2.length > 0) {
            stock[selectedStocks[1]] = stockData2[i][selectedStocks[1]];
          }
          if (stockData3.length > 0) {
            stock[selectedStocks[2]] = stockData3[i][selectedStocks[2]];
          }
          return stock;
        });
        setCandlesData(fData);
      })();
    }
  }, [selectedStocks, startDate, endDate, priceType]);

  const handleSelect = (stockSymbol: string) => {
    if (selectedStocks.length < 3) {
      const stocks = [...selectedStocks, stockSymbol];
      const filteredStocks = stocks.filter(
        (stock: string, i: number) => stocks.indexOf(stock) === i
      );
      setSelectedStocks(filteredStocks);
    } else {
      alert(
        'Opps!, You already selected 3 stocks. Please remove selected stocks'
      );
    }
    setOptions([]);
    setSearchTerm('');
  };

  const handleSearch = () => {
    const filteredOptions = stocks.filter((stock: IStock) =>
      stock.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredOptions.length === 0) {
      alert(`${searchTerm} not found`);
      setSearchTerm('');
    } else {
      setOptions(filteredOptions);
    }
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ): void => {
    if (type === DateType.START_DATE) {
      setStartDate(new Date(e.target.value));
    } else {
      setEndDate(new Date(e.target.value));
    }
  };

  const handleRemove = (stock: string) => {
    const filteredStocks = selectedStocks.filter((s) => s !== stock);
    setSelectedStocks(filteredStocks);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setOptions([]);
  };

  return (
    <>
      <h2 className="text-center mt-3">Stock Exchange Dashboard</h2>
      <div className="app-container d-flex">
        <div className="left-container">
          {candlesData.length > 0 && selectedStocks.length > 0 ? (
            <Chart candledData={candlesData} selectedStocks={selectedStocks} />
          ) : (
            <p className="message-text">
              Please select the stock to see the time series graph
            </p>
          )}
        </div>
        <div className="right-container">
          <div className="card">
            <div className="card-body">
              <SearchBar
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                handleSelect={handleSelect}
                options={options}
                handleOnChange={handleOnChange}
              />
              <div className="chips-container">
                {selectedStocks.map((stock) => {
                  return (
                    <Chip
                      key={stock}
                      stockName={stock}
                      handleClick={handleRemove}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card mt-2">
            <div className="dates-wrapper card-body">
              <div>
                <h6>From</h6>
                <input
                  id="from"
                  type="date"
                  value={startDate.toISOString().slice(0, 10)}
                  onChange={(e) => handleDateChange(e, DateType.START_DATE)}
                />
              </div>
              <div>
                <h6>To</h6>
                <input
                  id="to"
                  type="date"
                  value={endDate.toISOString().slice(0, 10)}
                  onChange={(e) => handleDateChange(e, DateType.END_DATE)}
                  max={'24/07/2023'}
                />
              </div>
            </div>
          </div>
          <PriceTypes setPriceType={setPriceType} priceType={priceType} />
        </div>
      </div>
    </>
  );
}

export default App;
