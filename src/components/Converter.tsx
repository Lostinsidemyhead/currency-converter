import React, { useState } from 'react';
import { fetchRate } from '../api/CurrencyService';


const Converter: React.FC = () => {

  const [inputState, setInputState] = useState<string>('0');
  const [convertedValue, setConvertedValue] = useState<string>('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputState(e.currentTarget.value);
  }

  const keyDownHander = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter') return;

    const rates = await fetchRate();
    const value = parseFloat(inputState);

    try {
      const originCurrency = inputState.toUpperCase().split('IN')[0].replace(/[^A-Z]+/g, '');
      const targetCurrency = inputState.toUpperCase().split('IN')[1].replace(/[^A-Z]+/g, '');
      const originRate = originCurrency === 'RUB' ? 1 : rates[originCurrency].Value;
      const targetRate = targetCurrency === 'RUB' ? 1 : rates[targetCurrency].Value;

      const result = (value * originRate / targetRate).toFixed(4);
      setConvertedValue(result);
    } catch {
      alert('Некорректный ввод');
    }
  }

  return (
    <div>
      <input
        className='converterInput'
        type='text'
        value={inputState}
        onChange={handleChange}
        onKeyDown={keyDownHander}
      />
      <div className='convertedValue'>
        {convertedValue}
      </div>
    </div>
  )
}

export default Converter;
