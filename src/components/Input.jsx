/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

function Input({ setQuery, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearchQuery = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-90 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search By City Name"
          className="text-fuchsia-900 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />

        <BsSearch
          size={30}
          className="cursor-pointer hover:scale-125"
          onClick={handleSearchQuery}
        />
        <IoLocationOutline
          size={35}
          className="cursor-pointer hover:scale-125"
          onClick={handleLocationClick}
        />

        <div className="flex flex-row w-1/4 items-center justify-center">
          <button
            className="text-2xl font-medium transition ease-out hover-scale-125"
            onClick={() => setUnits("metric")}
          >
            °C
          </button>
          <p className="text-2xl font-medium mx-1">|</p>
          <button
            className="text-2xl font-medium transition ease-out hover-scale-125"
            onClick={() => setUnits("imperial")}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
