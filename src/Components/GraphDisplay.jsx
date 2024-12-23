import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
);

const GraphDisplay = ({ weatherData }) => {
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);
  console.log(weatherData);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    
    const dates = weatherData.dates;
    console.log(weatherData.dates);
    const meanTemperature = weatherData.meanTemperature;
    const meanApparentTemperature = weatherData.meanApparentTemperature;

    
    const newChartInstance = new ChartJS(chartRef.current, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Mean Temperature (°C)',
            data: meanTemperature, 
            borderColor: 'rgba(255, 99, 132, 1)', 
            backgroundColor: 'rgba(255, 99, 132, 0.2)', 
            fill: true,
          },
          {
            label: 'Mean Apparent Temperature (°C)',
            data: meanApparentTemperature,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Date' },
          },
          y: {
            title: { display: true, text: 'Temperature (°C)' },
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [weatherData]);

  return <canvas ref={chartRef} className='bg-white md:p-4 rounded'></canvas>;
};

export default GraphDisplay;
