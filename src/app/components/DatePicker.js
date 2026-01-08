import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ value, onChange, className }) => {
  const [startDate, setStartDate] = useState(value?.[0] || null);
  const [endDate, setEndDate] = useState(value?.[1] || null);

  useEffect(() => {
    // Ensure value is an array of Date objects
    if (Array.isArray(value)) {
      setStartDate(value[0] instanceof Date ? value[0] : null);
      setEndDate(value[1] instanceof Date ? value[1] : null);
    }
  }, [value]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onChange) {
      onChange({ start, end }); // Pass the selected dates as an object
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      className={className}
      monthsShown={2}
      placeholderText="Select a date range"
      minDate={new Date()} // Restrict selection to today and future dates
    />
  );
};

export default MyDatePicker;
