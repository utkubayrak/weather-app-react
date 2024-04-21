import React from 'react';

function WeatherCard({ weatherCardData }) {
  console.log(weatherCardData);
  const getDayOfWeek = (dateString) => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  return (
    <>
      <div className="w-96 mb-8 p-8 h-80 mx-auto  rounded-lg bg-slate-100 text-gray-800 border shadow-md">
        <div className="flex justify-between space-x-8">
          <div className="flex flex-col items-center">
            <img src={weatherCardData.current.condition.icon} alt="" />
            <h1 className="text-xl font-semibold">{weatherCardData.location.name}
            {weatherCardData.location.name !== weatherCardData.location.region && ` / ${weatherCardData.location.region}`}</h1>
          </div>
          <span className="font-bold text-8xl">{weatherCardData.current.temp_c}°</span>
        </div>
        <div className="flex justify-between mt-8 space-x-4 text-gray-600">
        {weatherCardData.forecast.forecastday.map((forecastDay) => {
          const dayOfWeek = getDayOfWeek(forecastDay.date);
            return (
              <div className="flex flex-col items-center space-y-1">
                <span className="uppercase">{dayOfWeek}</span>
                <img src={forecastDay.day.condition.icon} alt="" />
                <span>{forecastDay.day.avgtemp_c}°</span>
              </div>
            )
          })}
        </div>
      </div>

    </>
  )
}

export default WeatherCard;