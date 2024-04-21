import React, { useState, useEffect } from 'react';
import { cityService, weatherForecastService, weatherService } from '../services/WeatherService';
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard';

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [city, setCity] = useState('');


  const handleSearch = async (e) => {
    e.preventDefault(); // Formun varsayılan gönderme davranışını engeller
    try {
      const data = await weatherForecastService(city);
      setCityWeatherData(data); // WeatherCard bileşenine gönderilecek veriyi günceller

    } catch (error) {
      console.error('Hava durumu bilgileri alınırken bir hata oluştu:', error);
    }
  };
  
  useEffect(() => {
    const getCities = async () => {
      try {
        const data = await cityService();
        if (data) {
          const cityNames = data.map(city => city.name.split(' ')[0])
          setCityData(cityNames);
        } else {
          console.error('Veri alınamadı');
        }
      } catch (error) {
        console.error('Şehir servisinden veri alınırken hata oluştu', error);
      }
    }; getCities();
  }, []
  );

  useEffect(() => {
    const getWeatherForCities = async () => {
      try {
        const weatherDataPromises = cityData.map(async cityName => {
          const data = await weatherService(cityName);
          return { cityName, data };
        });
        const allWeatherData = await Promise.all(weatherDataPromises);
        const weatherDataMap = allWeatherData.reduce((acc, { cityName, data }) => {
          acc[cityName] = data;
          return acc;
        }, {});
        setWeatherData(weatherDataMap);
      } catch (error) {
        console.error('Hava durumu bilgileri alınırken bir hata oluştu:', error);
      }
    };
    if (cityData.length > 0) {
      getWeatherForCities();
    }
  }, [cityData]
  );
  return (
    <>
      <Header></Header>
      <section className="relative h-96 w-full bg-[url(https://images8.alphacoders.com/135/1354188.jpeg)] bg-cover bg-center bg-no-repeat">
        <div className="flex items-center justify-center h-full ">
          <form onSubmit={handleSearch} className="max-w-[480px] w-full px-4">
            <div className="relative">
              <input
                type="text"
                className="w-full border h-12 shadow p-4 rounded-full focus-visible:outline-none"
                placeholder="Search..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  absolute top-3.5 right-3 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className=" mx-auto mt-5">
        <div className='grid md:grid-cols-2'>
        {cityWeatherData && <WeatherCard weatherCardData={cityWeatherData} />}
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className='flex flex-col gap-4 justify-center mb-5'>TÜRKİYE İÇİN HAVA KOŞULLARI</h1>
            {weatherData && Object.keys(weatherData).map((cityName, index) => {
              const cityWeather = weatherData[cityName];
              const temperature = cityWeather.current.temp_c;
              const weatherIcon = cityWeather.current.condition.icon;
              return (
                <div className="flex w-80 x-auto items-center p-4 bg-white rounded-lg shadow-md " key={index}>
                  <div className='flex justify-start w-48'>
                    <div className="text-xl flex justify-start w-full ">{cityName}</div>
                  </div>
                  <div className='w-36 flex justify-center items-center'>
                    <img className="w-12 h-12 flex " src={weatherIcon} alt="" />
                    <div className="text-2xl w-full flex justify-end">{temperature}°C</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>)
} export default Home;