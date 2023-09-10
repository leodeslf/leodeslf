import store from "../stores/store";
import { weatherSet } from "../stores/weatherSlice";

const ipUrl = 'https://api.ipdata.co/es?api-key=b3a6e1ab3f14ca073da324e9814030521bc2c89ce233e6bac8a9bdb3';
const weatherUrl = ({ city, country_code }) => `https://api.openweathermap.org/data/2.5/weather?appid=b280c897878592322aafe56701248929&lang=sp&units=metric&q=${city},${country_code}`;
const countryFlagUrl = ({ country_code }) => `https://flagsapi.com/${country_code}/flat/16.png`;
let timeout = 0;

export default async function getWeather() {
  if (timeout > 0) {
    return;
  }

  timeout = setTimeout(() => timeout = 0, 1000 * 60 * 10);
  const ipJson = await (await fetch(ipUrl)).json();
  const json = await (await fetch(weatherUrl(ipJson))).json();
  store.dispatch(weatherSet({
    cityName: json.name,
    code: json.cod,
    countryCode: ipJson.country_code,
    countryFlagUrl: countryFlagUrl(ipJson),
    description: json.weather[0].description,
    temp: Math.round(json.main.temp),
    tempMax: Math.round(json.main.temp_max),
    tempMin: Math.round(json.main.temp_min)
  }));
}
