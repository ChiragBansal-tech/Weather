const fetchWeatherData = async (inputs) => {
  const { latitude, longitude, startDate, endDate } = inputs;

  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];

  try {
    const response = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean`
    );

    const data = await response.json();
    // console.log(data);
    if (data && data.daily) {
      const weatherData = {
        dates: data.daily.time,
        maxTemperature: data.daily.temperature_2m_max,
        minTemperature: data.daily.temperature_2m_min,
        meanTemperature: data.daily.temperature_2m_mean,
        maxApparentTemperature: data.daily.apparent_temperature_max,
        minApparentTemperature: data.daily.apparent_temperature_min,
        meanApparentTemperature: data.daily.apparent_temperature_mean,
      };

      return weatherData;
    } else {
      throw new Error('Data not available');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default fetchWeatherData;
