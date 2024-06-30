import { useFont } from "../context/FontContext";
import Heading from "../components/Heading";
import NotFound from "./NotFound";
import ContentDisplay from "../components/ContentDisplay";
import ThemeBtn from "../components/ThemeBtn";
import { useState } from "react";

const HomePage = () => {
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
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
    if (inputError && e.target.value.trim() !== "") {
      setInputError(false);
      setErrorMessage("");
    }
  };

  return (
    <div
      className={`container mx-auto w-full h-full min-h-screen ${selectedFont.toLowerCase()} bg-white dark:bg-black text-black dark:text-white`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-between w-full max-w-lg items-center mt-10">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="38"
              viewBox="0 0 34 38"
              className="text-3xl text-gray-500"
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
              <div className="absolute right-0 top-5 hidden group-hover:block w-40 shadow-lg bg-white dark:bg-black text-gray-300  shadow-purple-500 rounded-md z-10">
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
            <div className="h-6 border-l border-gray-300 dark:border-gray-700"></div>
            <ThemeBtn />
          </div>
        </div>

        <div className="relative w-full max-w-lg mt-4">
          <input
            value={word}
            onChange={handleInputChange}
            type="text"
            className={`w-full bg-gray-200 dark:bg-[#3A3A3A]  dark:text-white border ${
              inputError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-purple-500"
            } rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              selectedFont.toLowerCase() === "sans"
                ? "font-sans"
                : selectedFont.toLowerCase() === "mono"
                ? "font-mono"
                : "font-serif"
            } text-black dark:text-white`}
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
            <p className="mt-4 flex mb-4">
              Source:
              <a
                href={results.sourceUrls[0]}
                className="text-[#2D2D2D] hover:underline flex items-center ml-2 dark:text-white"
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
};

export default HomePage;
