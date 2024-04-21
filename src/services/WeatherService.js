import axios from 'axios';

export const cityService = async () => {
  const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/TR/regions',
    headers: {
      'X-RapidAPI-Key': 'd5d30560dbmsh2e2a4d60af630a7p148cc1jsna0149d9c69f4',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data; // Return the data
  } catch (error) {
    console.error('Error fetching cities data:', error);
    throw error; // Throw the error to propagate it to the caller
  }
};
export const weatherService = async (cityName) => {
  const options = {
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: cityName }, // Fixed case of city name
    headers: {
      'X-RapidAPI-Key': 'd5d30560dbmsh2e2a4d60af630a7p148cc1jsna0149d9c69f4',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    // console.log('Weather API response:', response.data);
    return response.data; // Return the data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Throw the error to propagate it to the caller
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
      'X-RapidAPI-Key': 'd5d30560dbmsh2e2a4d60af630a7p148cc1jsna0149d9c69f4',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; // Return the data

  } catch (error) {
    console.error(error);
  }
};

