import { useEffect } from "react";
import { useSelector } from 'react-redux';
import getWeather from "../../../js/weather";

export default function Tw() {
  const weather = useSelector(state => state.weather);

  useEffect(() => {
    getWeather();
  }, []);

  return (weather.code === 200) ? (
    <div id="tw">
      <div className="tw__country">
        {`${weather.cityName}, ${weather.countryCode}`}
        <img
          alt="Country Flag"
          height="16"
          src={weather.countryFlagUrl}
          title="Country Flag"
          width="16"
        />
      </div>
      <span className="tw__current-temp">
        {weather.temp}°
      </span>
      <span className="tw__max-temp">
        Máx {weather.tempMax}°
      </span>
      <span className="tw__min-temp">
        Mín {weather.tempMin}°
      </span>
    </div>
  ) : (
    <p className="project__weather-placeholder">
      {weather.code === undefined ?
        'Cargando...' :
        'Algo salió mal con OpenWeather... 🤔'}
    </p>
  );
}
