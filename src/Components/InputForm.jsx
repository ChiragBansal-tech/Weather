import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isValidLatitude, isValidLongitude, isValidDateRange } from '../utils/validateInput';
import Toaster from '../Components/Tooster';
import { PulseLoader } from 'react-spinners';

const InputForm = ({ onSubmit, loading }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [toasterMessage, setToasterMessage] = useState('');
  const [toasterType, setToasterType] = useState('success');
  const [isToasterVisible, setIsToasterVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isValidLatitude(latitude) &&
      isValidLongitude(longitude) &&
      isValidDateRange(startDate, endDate)
    ) {
      onSubmit({ latitude, longitude, startDate, endDate });
    } else {
      setToasterMessage('Please provide valid inputs!');
      setToasterType('error');
      setIsToasterVisible(true);
    }
  };

  return (
    <div>
      {isToasterVisible && (
        <Toaster
          message={toasterMessage}
          type={toasterType}
          onClose={() => setIsToasterVisible(false)}
        />
      )}

      <form className="p-4 shadow rounded" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div>
            <label className="block font-medium text-gray-200">Latitude:</label>
            <input
              type="number"
              step="0.001"
              className="border p-2 w-full rounded"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="e.g., 52.52"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-200">Longitude:</label>
            <input
              type="number"
              step="0.001"
              className="border p-2 w-full rounded appearance-none"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g., 13.41"
              required
            />
          </div>
          <div className="flex gap-5">
            <div>
              <label className="block font-medium text-gray-200">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-200">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        </div>
        <button
          disabled={loading} 
          type="submit"
          className="text-center min-w-[180px] bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded mt-7"
        >
          {loading ? (
            <>
              Loading <PulseLoader color="#ffffff" size={8} />
            </>
          ) : (
            'Fetch Weather Data'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
