import React from "react";

const Filter = ({
  filterText,
  setFilterText,
  selectedType,
  setSelectedType,
  types,
}) => {
  return (
    <div className="bg-gray-800 p-4">
      <nav className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6 text-white">
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-gray-400">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="p-2 border rounded-md w-full max-w-xs text-black"
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded-md w-full max-w-xs text-black"
          >
            <option value="" className=" text-black">
              Filter by type
            </option>
            {types.map((type) => (
              <option key={type} value={type} className=" text-black">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </div>
  );
};

export default Filter;
