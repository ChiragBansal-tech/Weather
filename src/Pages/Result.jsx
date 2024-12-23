import React from 'react';
import { useLocation } from 'react-router-dom';
import GraphDisplay from '../Components/GraphDisplay';
import DataTable from '../Components/DataTable';
import Navbar from '../Components/Navbar';

const ResultPage = () => {

  const { state } = useLocation();
  const weatherData = state?.weatherData || {};

  const weatherDataRows = weatherData.dates
    ? weatherData.dates.map((date, index) => ({
      date,
      maxTemperature: weatherData.maxTemperature[index],
      minTemperature: weatherData.minTemperature[index],
      meanTemperature: weatherData.meanTemperature[index],
      maxApparentTemperature: weatherData.maxApparentTemperature[index],
      minApparentTemperature: weatherData.minApparentTemperature[index],
      meanApparentTemperature: weatherData.meanApparentTemperature[index],
    }))
    : [];

  return (
    <div className='bg-custom min-h-screen bg-cover'>
      <Navbar />
      <div className="container mx-auto p-4">
        {weatherDataRows.length === 0 ? (
          <p>No data available. Please try submitting the form again.</p>
        ) : (
          <>
            <div className='grid grid-cols-1 gap-5'>
              <GraphDisplay weatherData={weatherData} />
              <DataTable weatherData={weatherDataRows} rowsPerPage={10} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
