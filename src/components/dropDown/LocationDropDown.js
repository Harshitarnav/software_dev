import React, { useState, useRef, useEffect } from "react";

const locations = ["Delhi", "Ghaziabad", "Noida"];

const LocationDropDown = ({ setLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setLocation(location);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between w-full h-10 px-4 rounded-xl bg-tertiary text-primary border border-gray-300 focus:border-4 focus:border-secondary cursor-pointer"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <span>{selectedLocation || "Select Location"}</span>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {locations.map((location) => (
            <div
              key={location}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => selectLocation(location)}
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDropDown;
