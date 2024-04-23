import React, { useState, useEffect } from 'react';
import { cityService, ipAddressService, weatherForecastService, weatherService } from '../services/WeatherService';
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard';
import bgImage from '../assets/image/bg-image.webp';

function Home() {
  const [ipAddressInfo, setIpAddressInfo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [city, setCity] = useState('');

  //Ip adres işlemleri
  useEffect(() => {
    const fetchIP = async () => {
        const response = await fetch('https://api.ipify.org');
        const data = await response.text();
        setIpAddressInfo(await ipAddressService(data));
    };
    fetchIP();
  }, []);

  //Belirli bir şehrin hava durumu verilerin alınması
  useEffect(() => {
    const fetchWeatherData = async () => {
        if (city) {
          const data = await weatherForecastService(city);
          setCityWeatherData(data);
        } else if (ipAddressInfo) {
          const data = await weatherForecastService(ipAddressInfo.city);
          setCityWeatherData(data);
        }
    };
    fetchWeatherData();
  }, [city, ipAddressInfo]);

  //Ip adress'e göre ülkenin şehir listesinin alınması
  useEffect(() => {
    const getCities = async () => {
        if (ipAddressInfo && ipAddressInfo.country) {
          const data = await cityService(ipAddressInfo.country.code);
          if (data) {
            const cityNames = data.map(city => city.name.split(' ')[0])
            setCityData(cityNames);
          } else {
            console.error('Veri alınamadı');
          }
        }
    };
    getCities();
  }, [ipAddressInfo]);

  //Ülkenin şehirlerinin hava durumu bilgilerinin alınması
  useEffect(() => {
    const getWeatherForCities = async () => {
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
    };
    if (cityData.length > 0) {
      getWeatherForCities();
    }
  }, [cityData]);

  //Form ile şehir ismi alma
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
    e.target.reset(); // Formu resetle
  };
  return (
    <>
     {ipAddressInfo && <Header address={ipAddressInfo} />}
      <section className="relative h-96 w-full bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <div className="flex items-center justify-center h-full ">
          <form onSubmit={handleSubmit} className="max-w-[480px] w-full px-4">
            <div className="relative">
              <input
                type="text"
                name='city'
                className="w-full border h-12 shadow p-4 rounded-full focus-visible:outline-none"
                placeholder="Search..."
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
            <h1 className='flex flex-col gap-4 justify-center mb-5'>{ipAddressInfo?.country?.name || 'Bilinmeyen Ülke'} İÇİN HAVA KOŞULLARI</h1>
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
    </>
  )
}
export default Home;