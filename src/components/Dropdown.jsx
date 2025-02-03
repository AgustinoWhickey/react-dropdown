import React, { useState } from "react";

const Dropdown = ({ options, label }) => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-64">
      <button
        className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : label || "Select an option"}
        <span>▼</span>
      </button>
      {isOpen && (
        <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-2">
          {options.map((option) => (
            <li
              key={option.value}
              className="p-2 cursor-pointer hover:bg-blue-100"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
