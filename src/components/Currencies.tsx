import React, { useEffect, useState } from 'react';
import { fetchRate } from '../api/CurrencyService';
import Selector from './Selector';

export enum currencies {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR'
}

export type currency = {
  code: string,
  rate: string
}

const Currencies: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<currencies | string>(currencies.RUB);
  const [rates, setRates] = useState<currency[]>();

  useEffect(() => {
    const userLang = navigator.language;
    switch (userLang) {
      case 'ru-RU':
        setBaseCurrency(currencies.RUB);
        break;
      case 'en':
        setBaseCurrency(currencies.USD);
        break;
      default:
        setBaseCurrency(currencies.EUR);
    }
    fillTable();
  }, []);

  useEffect(() => {
    fillTable();
  }, [baseCurrency]);

  const onChangeCurrency = (code: string) => {
    setBaseCurrency(code);
  }

  const fillTable = async () => {
    const fetchedRates = await fetchRate();
    const currentRate = fetchedRates[baseCurrency]?.Value || 1;

    const rates: currency[] = [];
    if (baseCurrency !== currencies.RUB) {
      rates.push({
        code: currencies.RUB,
        rate: (1 / currentRate).toFixed(4)
      });
    }

    for (let currency in currencies) {
      if (baseCurrency === currency) continue;

      if (fetchedRates[currency]?.CharCode) {
        rates.push({
          code: fetchedRates[currency].CharCode,
          rate: (fetchedRates[currency].Value / currentRate).toFixed(4)
        });
      }
    }

    setRates(rates);
  }

  return (
    <div>
      <Selector
        current={baseCurrency}
        allCurrencies={rates}
        onChange={onChangeCurrency}
      />
      {rates?.map((item) => (
        <div className='currency' key={item.code}>
          1 {item.code} = {item.rate} {baseCurrency}
        </div>
      ))}

    </div>
  )
}

export default Currencies;
