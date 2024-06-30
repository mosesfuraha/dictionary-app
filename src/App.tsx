import { useState } from "react";
import { useFont } from "./context/FontContext";
import Heading from "./components/Heading";
import ContentDisplay from "./components/ContentDisplay";
import NotFound from "./Pages/NotFound";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { selectedFont, handleFontChange } = useFont();

  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchWord = async () => {
    if (word.trim() === "") {
      setInputError(true);
      setErrorMessage("Whoops, can't be empty");
      setNotFound(false);
      setResults(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        setNotFound(true);
        setResults(null);
        setInputError(false);
        throw new Error("Word not found");
      }
      const data = await response.json();
      setResults(data[0]);

      setNotFound(false);
      setInputError(false);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
    }
    console.log(results);
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
    if (inputError && e.target.value.trim() !== "") {
      setInputError(false);
      setErrorMessage("");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`container mx-auto mt-10 w-full h-full ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-between w-full max-w-lg items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="38"
              viewBox="0 0 34 38"
              className={`text-3xl ${
                isDarkMode ? "text-purple-500" : "text-gray-500"
              }`}
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="#838383"
                strokeLinecap="round"
                strokeWidth="1.5"
              >
                <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
                <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" />
                <path d="M11 9h12" />
              </g>
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center group">
              <span className="mr-2 font-bold">{selectedFont}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                viewBox="0 0 14 8"
                className="text-purple-500 cursor-pointer"
              >
                <path
                  fill="none"
                  stroke="#A445ED"
                  strokeWidth="1.5"
                  d="m1 1 6 6 6-6"
                />
              </svg>
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-5 hidden group-hover:block w-40 bg-white rounded-md shadow-xl z-10">
                <ul>
                  {["Sans", "Sans Serif", "Mono"].map((font) => (
                    <li
                      key={font}
                      className={`px-4 py-2 cursor-pointer font-bold ${
                        selectedFont === font
                          ? "text-purple-500"
                          : "hover:text-purple-500"
                      }`}
                      onClick={() => handleFontChange(font)}
                    >
                      {font}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="h-6 border-l border-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDarkMode}
              >
                <svg
                  width="40"
                  height="20"
                  viewBox="0 0 40 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="40"
                    height="20"
                    rx="10"
                    fill={isDarkMode ? "#A445ED" : "#757575"}
                  />
                  <circle
                    cx={isDarkMode ? "30" : "10"}
                    cy="10"
                    r="7"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="cursor-pointer text-gray-500 ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="#838383"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Input Section */}
        <div className="relative w-full max-w-lg mt-4">
          <input
            value={word}
            onChange={handleInputChange}
            type="text"
            className={`w-full bg-[#E9E9E9] border ${
              inputError ? "border-red-500" : "border-gray-300"
            } rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              selectedFont.toLowerCase() === "sans"
                ? "font-sans"
                : selectedFont.toLowerCase() === "mono"
                ? "font-mono"
                : "font-serif"
            }`}
            placeholder="Search..."
          />
          <button
            className="absolute right-2 top-2 flex items-center justify-center"
            onClick={searchWord}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                fill="none"
                stroke="#A445ED"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
              />
            </svg>
          </button>
        </div>
        {inputError && (
          <p className="text-red-500 font-bold text-3xl">
            Whoops, can't be empty
          </p>
        )}
        {notFound && <NotFound />}

        {results && (
          <>
            <Heading
              word={results.word}
              phonetic={results.phonetic}
              audio={results.phonetics.find((p) => p.audio)?.audio}
            />
            {results.meanings.map((content, index) => (
              <ContentDisplay
                key={index}
                partOfSpeech={content.partOfSpeech}
                definitions={content.definitions}
              />
            ))}
            <p className="mt-4 flex  mb-4">
              Source:
              <a
                href={results.sourceUrls[0]}
                className="text-[#2D2D2D] hover:underline flex items-center ml-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {results.sourceUrls[0]}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  className="ml-2"
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
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
