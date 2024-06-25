function Forecast({ title, data }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>

      <hr className="my-1" />

      <div className="flex items-center justify-between">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <p className="font-light text-sm">{item.title}</p>

            <img className="w-10 h-10 my-1" src={item.icon} alt="Icon" />

            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
