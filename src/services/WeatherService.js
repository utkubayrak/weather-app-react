import axios from 'axios';

const apiKey = process.env.REACT_APP_RAPID_API_KEY;

export const ipAddressService = async (ipAddress) => {
const encodedParams = new URLSearchParams();
encodedParams.set('ip', `${ipAddress}`);
const options = {
  method: 'POST',
  url: 'https://ip-location5.p.rapidapi.com/get_geo_info',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': `${apiKey}`,
    'X-RapidAPI-Host': 'ip-location5.p.rapidapi.com'
  },
  data: encodedParams,
};
try {
	const response = await axios.request(options);
  console.log('xxxx');
  return response.data;
} catch (error) {
	console.error(error);
}
}

export const cityService = async (country) => {
  const BASE_URL = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country}/regions`
  const options = {
    method: 'GET',
    url: BASE_URL,
    headers: {
      'X-RapidAPI-Key': `${apiKey}`,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching cities data:', error);
    throw error; 
  }
};
export const weatherService = async (cityName) => {
  const options = {
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: cityName }, 
    headers: {
      'X-RapidAPI-Key': `${apiKey}`,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data; 
  } catch (error) {
    console.error('Error fetching weather data for cities:', error);
    throw error;
  }
};

export const weatherForecastService = async (cityName) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: cityName,
      days: '3'
    },
    headers: {
      'X-RapidAPI-Key': `${apiKey}`,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data; 

  } catch (error) {
    console.error('Error fetching weather data for city: ', error);
  }
};

