import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import "../../src/styles/global.css"; // Import Tailwind styles

const Dropdown = ({ options, multiple = true, enableSearch = true, usePortal = false, customRender }) => {
  const [selected, setSelected] = useState(multiple ? [] : null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleSelect = (option) => {
    if (multiple) {
      setSelected((prev) => {
        return prev.some((item) => item.value === option.value)
          ? prev.filter((item) => item.value !== option.value)
          : [...prev, option];
      });
    } else {
      setSelected(option);
      setIsOpen(false);
    }
  };

  const removeOption = (option) => {
    setSelected((prev) => prev.filter((item) => item.value !== option.value));
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dropdownMenu = (
    <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-[1050]">
      {enableSearch && (
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border-b outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      {filteredOptions.map((option) => (
        <li
          key={option.value}
          className={`p-2 cursor-pointer hover:bg-blue-100 ${
            multiple && selected.some((item) => item.value === option.value)
              ? "bg-blue-200"
              : ""
          }`}
          onClick={() => handleSelect(option)}
        >
          {customRender ? customRender(option) : option.label}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative w-64">
      <div
        className="w-full flex justify-between items-center px-4 py-2 border rounded-lg shadow-sm bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {multiple ? (
          <div className="flex flex-wrap gap-2">
            {selected.length > 0 ? (
              selected.map((item) => (
                <span
                  key={item.value}
                  className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-full text-sm"
                >
                  {item.label}
                  <X
                    className="ml-2 w-4 h-4 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(item);
                    }}
                  />
                </span>
              ))
            ) : (
              <span className="text-gray-400">Select options</span>
            )}
          </div>
        ) : (
          <span>{selected ? selected.label : "Select an option"}</span>
        )}
        <ChevronDown className="w-4 h-4" />
      </div>
      {isOpen && (usePortal ? createPortal(dropdownMenu, document.body) : dropdownMenu)}
    </div>
  );
};

export default Dropdown;
