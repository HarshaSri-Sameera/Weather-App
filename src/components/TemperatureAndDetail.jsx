import { PiThermometerDuotone } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { GiPaperWindmill } from "react-icons/gi";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";

function TemperatureAndDetail(weather, units) {
  const {
    details,
    icon,
    sunrise,
    sunset,
    temp_max,
    temp_min,
    temp,
    speed,
    humidity,
    feels_like,
  } = weather.weather;

  const extraDetails = [
    {
      id: 1,
      Icon: PiThermometerDuotone,
      sub: "Feels like",
      value: `${feels_like.toFixed()}°`,
      size: 18,
    },
    {
      id: 2,
      Icon: WiHumidity,
      sub: "Humidity",
      value: `${humidity.toFixed()}%`,
      size: 21,
    },
    {
      id: 3,
      Icon: GiPaperWindmill,
      sub: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
      size: 16,
    },
  ];

  const extraDetails2 = [
    {
      id: 1,
      Icon: BsSunrise,
      sub: "Sun Rise",
      value: sunrise,
      size: 35,
    },
    {
      id: 2,
      Icon: BsSunset,
      sub: "Sun Set",
      value: sunset,
      size: 35,
    },
    {
      id: 3,
      Icon: TbArrowBigUp,
      sub: "High",
      value: temp_max.toFixed() + "°",
      size: 30,
    },
    {
      id: 4,
      Icon: TbArrowBigDown,
      sub: "Low",
      value: `${temp_min.toFixed()}°`,
      size: 30,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-fuchsia-800">
        <p>{details}</p>
      </div>

      <div className="flex flex-row justify-between items-center py-3">
        <img className="w-10 h-10" src={icon} alt="Icon" />

        <p className="text-5xl">{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-3 flex-start">
          {extraDetails.map(({ id, Icon, sub, value, size }) => (
            <div
              key={id}
              className="flex flex-light text-sm items-center justify-center"
            >
              <Icon className="mr-1" size={size} />
              {sub}:&nbsp;{value}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center space-x-10 text-sm py-9">
        {extraDetails2.map(({ id, Icon, sub, value, size }) => (
          <div
            key={id}
            className="flex flex-col text-sm items-center justify-center"
          >
            <Icon size={size} />
            <p className="font-light ml-1">
              {sub}:&nbsp;{value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemperatureAndDetail;
