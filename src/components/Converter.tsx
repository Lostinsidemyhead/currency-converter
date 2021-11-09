import React, { useState } from 'react';
import { fetchRate } from '../api/CurrencyService';

const hints = {
  inputHint: 'Example: 15 eur in usd',
  errorHint: 'Incorrect input!',
};

const Converter: React.FC = () => {

  const [inputState, setInputState] = useState<string>('0');
  const [convertedValue, setConvertedValue] = useState<string>('');
  const [hintIsShown, setHintIsShown] = useState<boolean>(false);
  const [hint, setHint] = useState<string>(hints.inputHint);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputState(e.currentTarget.value);
  }

  const keyDownHander = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setHint(hints.inputHint);
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
      setHint(hints.errorHint);
      setHintIsShown(true);
    }
  }

  const inputFocusHandler = () => {
    setHint(hints.inputHint)
    setHintIsShown(true);
  }

  const inputBlurHandler = () => {
    setHintIsShown(false);
  }

  return (
    <div>
      <input
        className='converter-input'
        type='text'
        value={inputState}
        onChange={handleChange}
        onKeyDown={keyDownHander}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
      />
      {hintIsShown &&
        <div className='hint'>
          {hint}
        </div>
      }
      <div className='converted-value'>
        {convertedValue}
      </div>
    </div>
  )
}

export default Converter;
