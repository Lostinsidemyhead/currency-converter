import React, { useEffect, useState } from 'react';
import { fetchRate } from '../api/CurrencyService';

enum currencies {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR'
}

type currency = {
  code: string,
  rate: number
}

const Currencies: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<currencies>(currencies.USD);
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

  const fillTable = async () => {
    const fetchedRates = await fetchRate();
    const currentRate = fetchedRates[baseCurrency]?.Value || 1;

    const rates: currency[] = [];

    if (baseCurrency !== currencies.RUB) {
      rates.push({
        code: currencies.RUB,
        rate: 1 / currentRate

      });
    }

    for (let currency in currencies) {
      if (baseCurrency === currency) continue;

      if (baseCurrency !== currencies.RUB) {
        rates.push({
          code: currencies.RUB,
          rate: 1 / currentRate
        });
      } else {
        rates.push({
          code: fetchedRates[currency].CharCode,
          rate: fetchedRates[currency].Value / currentRate
        });
      }
    }

    setRates(rates);
  }

  return (
    <div>
      {rates?.map((currency) => (

        <div>
          {currency.code}
          {currency.rate}
        </div>

      ))}

    </div>
  )
}

export default Currencies;
