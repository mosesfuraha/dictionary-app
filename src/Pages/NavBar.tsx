import React, { useState } from "react";

const NavBar = () => {
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Sans-serif");

  const fonts = ["Sans-serif", "Serif", "Mono"];

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    setFontDropdownOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      <div className="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
        >
          <path
            fill="none"
            stroke="#838383"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
        >
          <path
            fill="none"
            stroke="#838383"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
          />
        </svg>
      </div>

      <div className="relative">
        <button
          onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
          className="flex items-center space-x-2"
        >
          <span>{selectedFont}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="8"
            viewBox="0 0 14 8"
          >
            <path
              fill="none"
              stroke="#A445ED"
              strokeWidth="1.5"
              d="m1 1 6 6 6-6"
            />
          </svg>
        </button>
        {fontDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            {fonts.map((font) => (
              <button
                key={font}
                onClick={() => handleFontSelect(font)}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                {font}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
