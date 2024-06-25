/* eslint-disable no-unused-vars */
import "./App.css";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetail from "./components/TemperatureAndDetail";
import Forecast from "./components/Forecast";
import getFormattedData from "./services/WeatherService";
import { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Kakinada" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);

    await getFormattedData({ ...query, units }).then((data) => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-slate-600 to-fuchsia-950";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-slate-600 to-fuchsia-950";
    return "from-yellow-400 to-orange-600";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 px-32 py-5 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Input setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetail weather={weather} units={units} />
          <Forecast title="3 hour step forcast" data={weather.hourly} />
          <Forecast title="daily forcast" data={weather.daily} />
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />

      <p className="text-center pt-7 mt-7 font-thin flex items-center justify-center">
        Made with <IoHeart className="mx-1 text-red-500" /> by Sameera
      </p>
      <p className="text-center flex items-center justify-center pt-3">
        <a
          href="https://www.linkedin.com/in/harsha-sri-sameera-6366901a5/"
          target="_blank"
        >
          <FaLinkedin className="mx-1 text-blue-600" />
        </a>
        <a href="https://github.com/HarshaSri-Sameera" target="_blank">
          <FaGithub className="mx-1 text-slate-950" />
        </a>
      </p>
    </div>
  );
}

export default App;
