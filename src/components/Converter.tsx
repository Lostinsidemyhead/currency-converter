import React, { useEffect, useState } from 'react';
import { fetchRate } from '../api/CurrencyService';


interface ConverterProps {
}

const Converter: React.FC<ConverterProps> = () => {

  const [inputState, setInputState] = useState<string>('0');
  const [currency, setCurrency] = useState<string>();

  useEffect(() => {
    const userLang = navigator.language;
    switch (userLang) {
      case 'ru-RU':
        setCurrency('RUB');
        break;
      case 'en-EN':
        setCurrency('USD');
        break;
      default:
        setCurrency('EUR');
    }
  }, [navigator.language]);


  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    if (/^[0-9]+$/.test(input) || input === "") {
      setInputState(e.currentTarget.value);
    }
  }

  const keyDownHander = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter') return;

    const rates = await fetchRate();

    console.log(rates, currency);
    

  }

  return (
    <div>
      <input
        type='text'
        value={inputState}
        onChange={handleChange}
        onKeyDown={keyDownHander}
      />
      <div>

      </div>
    </div>
  )
}

export default Converter;
