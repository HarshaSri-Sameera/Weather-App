/* eslint-disable no-unused-vars */
import { DateTime } from "luxon";

const API_KEY = "2f67bea57400072cd7e2b318bf551de9";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  // console.log(url);
  return fetch(url).then((res) => res.json());
};

// getWeatherData();

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const iconUrlFromData = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    temp,
    feels_like,
    humidity,
    temp_max,
    temp_min,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromData(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const forecastFormat = (secs, offset, data) => {
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromData(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromData(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecast = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((data) => forecastFormat(dt, timezone, data.list));

  return { ...formattedCurrentWeather, ...formattedForecast };
};

export default getFormattedData;
