import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../Components/InputForm';
import fetchWeatherData from '../services/apiService';
import Navbar from '../Components/Navbar';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (inputs) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(inputs);
      navigate('/results', { state: { weatherData: data } });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-custom min-h-screen bg-cover'>
      <Navbar />
      <div className="container mx-auto p-4">
        <InputForm onSubmit={handleFormSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
