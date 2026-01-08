"use client";
import React from "react";

import Select from "react-select";

const CubicMultiSelect = ({ options, value, onChange, placeholder, text }) => {
  return (
    <div>
      <div className="text-sm text-cubic-white">{text}</div>
      <div>
        <Select
          isMulti
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default CubicMultiSelect;
