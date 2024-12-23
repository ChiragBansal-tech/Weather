import React, { useState, useEffect } from 'react';

const DataTable = ({ weatherData, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);  // Update for small screens
    };

    // Listen for window resize event
    window.addEventListener('resize', handleResize);

    // Set initial screen size on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalRows = weatherData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = weatherData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className=" flex flex-col justify-between  p-2 md:p-4 bg-white shadow rounded min-h-[630px] lg:min-h-[530px]">
      <table className="lg:min-w-[100%] table-auto">
        <thead>
          <tr>
            <th className="border text-sm md:text-base p-1 md:p-2 lg:p-2">Date</th>
            {isSmallScreen ? (
              <>
                <th className="border text-sm md:text-base p-1 md:p-2 lg:p-2">Min/Max Temp (°C)</th>
                <th className="border text-sm md:text-base p-1 md:p-2 lg:p-2">Mean Temp (°C)</th>
                <th className="border text-sm md:text-base p-1 md:p-2 lg:p-2">Min/Max Apparent Temp (°C)</th>
                <th className="border text-sm md:text-base p-1 md:p-2 lg:p-2">Mean Apparent Temp (°C)</th>
              </>
            ) : (
              <>
                <th className="border p-2">Max Temp (°C)</th>
                <th className="border p-2">Min Temp (°C)</th>
                <th className="border p-2">Mean Temp (°C)</th>
                <th className="border p-2">Max Apparent Temp (°C)</th>
                <th className="border p-2">Min Apparent Temp (°C)</th>
                <th className="border p-2">Mean Apparent Temp (°C)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((data, index) => (
            <tr key={index}>
              <td className="border text-xs md:text-base p-2">{data.date}</td>
              {isSmallScreen ? (
                <>
                  <td className="border text-xs md:text-base p-2">{data.minTemperature}/{data.maxTemperature}</td>
                  <td className="border text-xs md:text-base  p-2">{data.meanTemperature}</td>
                  <td className="border text-xs md:text-base  p-2">{data.minApparentTemperature}/{data.maxApparentTemperature}</td>
                  <td className="border text-xs md:text-base  p-2">{data.meanApparentTemperature}</td>
                </>
              ) : (
                <>
                  <td className="border p-2">{data.maxTemperature}</td>
                  <td className="border p-2">{data.minTemperature}</td>
                  <td className="border p-2">{data.meanTemperature}</td>
                  <td className="border p-2">{data.maxApparentTemperature}</td>
                  <td className="border p-2">{data.minApparentTemperature}</td>
                  <td className="border p-2">{data.meanApparentTemperature}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 ">
        <button
          onClick={handlePrevPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
