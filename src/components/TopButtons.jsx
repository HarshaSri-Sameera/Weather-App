/* eslint-disable react/prop-types */
function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      tittle: "New York",
    },
    {
      id: 2,
      tittle: "London",
    },
    {
      id: 3,
      tittle: "New Delhi",
    },
    {
      id: 4,
      tittle: "Tokyo",
    },
    {
      id: 5,
      tittle: "Sydney",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium hover:bg-red-950 px-3 py-2 rounded-md transition ease-in"
          onClick={() => setQuery({ q: city.tittle })}
        >
          {city.tittle}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
