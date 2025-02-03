import React, { useState, useRef } from "react";
import { useFloating, shift, flip, size, autoUpdate } from "@floating-ui/react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const Dropdown = ({
  options,
  multiple = false,
  searchable = true,
  usePortal = false,
  renderOption,
  onChange,
}) => {
  const [selected, setSelected] = useState(multiple ? [] : null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);
  
  const { x, y, refs, strategy } = useFloating({
    placement: "bottom-start",
    middleware: [shift(), flip(), size()],
    whileElementsMounted: autoUpdate,
  });

  const filteredOptions = query
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  const handleSelect = (option) => {
    if (multiple) {
      setSelected((prev) => {
        const exists = prev.some((item) => item.value === option.value);
        const newSelection = exists
          ? prev.filter((item) => item.value !== option.value)
          : [...prev, option];
        onChange && onChange(newSelection);
        return newSelection;
      });
    } else {
      setSelected(option);
      onChange && onChange(option);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-64">
      <button
        ref={refs.setReference}
        className="w-full flex justify-between items-center px-4 py-2 border rounded-lg shadow-sm bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {multiple
            ? selected.length > 0
              ? selected.map((s) => s.label).join(", ")
              : "Select options"
            : selected?.label || "Select an option"}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0, zIndex: 1050 }}
          className="absolute w-64 mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {searchable && (
            <input
              type="text"
              className="w-full p-2 border-b focus:outline-none"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <Listbox as="div" value={selected} onChange={handleSelect} multiple={multiple}>
            {filteredOptions.map((option) => (
              <Listbox.Option key={option.value} value={option}>
                {({ active, selected }) => (
                  <div
                    className={`flex items-center p-2 cursor-pointer ${
                      active ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {multiple && selected && <Check className="w-4 h-4 mr-2" />}
                    {renderOption ? renderOption(option) : <span>{option.label}</span>}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
