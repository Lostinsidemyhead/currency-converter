import axios from 'axios';

const url = "https://www.cbr-xml-daily.ru/daily_json.js";

export const fetchRate = async () => {
  const responce = await axios.get(url);
  return responce.data?.Valute;
}

