import store from "../stores/store";
import { weatherSet } from "../stores/weatherSlice";

const ipUrl = 'https://api.ipdata.co/es?api-key=e74737cb776b0fb96e8fd1241bc119c7438e15e55e224cea3e5b333a';
const weatherUrl = ({ region, country_code }) => `https://api.openweathermap.org/data/2.5/weather?appid=cdd659df7dc048884575b9451ddf1330&lang=sp&units=metric&q=${region},${country_code}`;
const countryFlagUrl = (country_code) => `https://flagsapi.com/${country_code}/flat/16.png`;
let timeout = 0;

export default async function getWeather() {
  if (timeout > 0) {
    return;
  }

  timeout = setTimeout(() => timeout = 0, 1000 * 60 * 10);
  const ipJson = await (await fetch(ipUrl)).json();
  const weatherData = await fetch(weatherUrl(ipJson))
    .then(weatherResponse => {
      if (weatherResponse.ok) {
        return weatherResponse;
      }
      // Fallback.
      return fetch(weatherUrl({ region: "Tokyo", country_code: "JP" }))
        .then(async weatherMontevideoResponse => {
          if (weatherMontevideoResponse.ok) {
            return weatherMontevideoResponse;
          }
          throw Error();
        });
    })
    .then(async weatherResponse => {
      const weatherJson = await weatherResponse.json();
      return {
        cityName: weatherJson.name,
        code: weatherJson.cod,
        countryCode: weatherJson.sys.country,
        countryFlagUrl: countryFlagUrl(weatherJson.sys.country),
        description: weatherJson.weather[0].description,
        temp: Math.round(weatherJson.main.temp),
        tempMax: Math.round(weatherJson.main.temp_max),
        tempMin: Math.round(weatherJson.main.temp_min)
      };
    });
  store.dispatch(weatherSet(weatherData));
}
