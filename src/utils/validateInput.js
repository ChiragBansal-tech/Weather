const isValidLatitude = (lat) => {
    const latitude = parseFloat(lat);
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  };
  
  const isValidLongitude = (lon) => {
    const longitude = parseFloat(lon);
    return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
  };
  
  const isValidDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start instanceof Date && !isNaN(start) && end instanceof Date && !isNaN(end) && start <= end;
  };
  
  export { isValidLatitude, isValidLongitude, isValidDateRange };
  