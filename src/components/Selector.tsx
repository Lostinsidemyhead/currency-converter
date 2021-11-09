import React, { useEffect, useState } from 'react';
import { currencies, currency } from './Currencies';

interface ISelectorProps {
  current: string,
  allCurrencies?: currency[],
  onChange: (currency: string) => void
}

const Selector: React.FC<ISelectorProps> = ({ ...props }) => {

  const [currencies, setCurrencies] = useState<currency[]>();

  useEffect(() => {
    setCurrencies(props.allCurrencies);
  }, [props.allCurrencies])

  const updateCurrent = (newCurrency: string) => {
    props.onChange(newCurrency);
  }

  return (
    <div>
      <div>{props.current}</div>

      <div className='list'>
        {currencies?.map((item) => (
          <button
            key={item.code}
            className='list-item'
            onClick={() => updateCurrent(item.code)}
          >
            {item.code}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Selector;
