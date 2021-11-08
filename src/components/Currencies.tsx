import React, { useEffect, useState } from 'react';
import { fetchRate } from '../api/CurrencyService';

enum currencies {
  rub = 'RUB',
  usd = 'USD',
  eur = 'EUR'
}

const Currencies: React.FC = () => {
  const [currency, setCurrency] = useState<currencies>(currencies.usd);
  const [rates, setRates] = useState<number[]>();

  useEffect(() => {
    // const userLang = navigator.language;
    // switch (userLang) {
    //   case 'ru-RU':
    //     setCurrency(currencies.rub);
    //     break;
    //   case 'en':
    //     setCurrency(currencies.usd);
    //     break;
    //   default:
    //     setCurrency(currencies.eur);
    // }
    fillTable();
  }, []);

  useEffect(() => {

  }, [currency]);

  const fillTable = async () => {
    const rates = await fetchRate();
    const currentRate = rates[currency]?.Value || 1;

    const RUBRate = 1 / currentRate;
    const USDRate = rates.USD.Value / currentRate;
    const EURRate = rates.EUR.Value / currentRate;

    setRates([RUBRate, USDRate, EURRate]);

  }

  return (
    <div>
      {rates?.map((rate) => (

        <div>
          {rate}
        </div>

      ))}
    </div>
  )
}

export default Currencies;
