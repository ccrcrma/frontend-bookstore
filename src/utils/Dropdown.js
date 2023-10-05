import React from "react";

function Dropdown({ options, selectedValue, onChange }) {
  return (
    <select value={selectedValue} onChange={onChange}>
      <option value="">Select a genre</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
