import { useEffect } from "react";
import { useSelector } from 'react-redux';
import getWeather from "../../../js/weather";

export default function Tw2() {
  const weather = useSelector(state => state.weather);

  useEffect(() => {
    getWeather();
  }, []);

  return (weather.code === 200) ? (
    <div id="tw2">
      <span className="tw2__temp">
        {weather.temp}°
      </span>
      <span className="tw2__name">
        {weather.cityName}
      </span>
      <span className="tw2__text">
        {weather.description}
      </span>
    </div>
  ) : (
    <p className="project__weather-placeholder">
      {weather.code === undefined ?
        'Cargando...' :
        'Error al consultar OpenWeather.'}
    </p>
  );
}
