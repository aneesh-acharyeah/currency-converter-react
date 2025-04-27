import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
      });

    if (fromCurrency && toCurrency) {
      axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
          setExchangeRate(response.data.rates[toCurrency]);
          setConvertedAmount(amount * response.data.rates[toCurrency]);
        })
    }
  }, [amount, fromCurrency, toCurrency])

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  const handleFromCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  }
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
        />

        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>

        <span>to</span>

        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <div className="result">
          {convertedAmount && (
            <p>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          )}
        </div>
      </div>
      <footer className="footer">
        Made with ❤️ by Aneesh G
      </footer>
    </div>

  );
}


export default App;
