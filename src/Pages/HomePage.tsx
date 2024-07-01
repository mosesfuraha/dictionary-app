import { useFont } from "../context/FontContext";
import Heading from "../components/Heading";
import NotFound from "./NotFound";
import ContentDisplay from "../components/ContentDisplay";
import ThemeBtn from "../components/ThemeBtn";
import { useState, ChangeEvent } from "react";

interface DictionaryAPIResponse {
  word: string;
  phonetic: string;
  phonetics: { audio?: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
    synonyms: string[];
  }[];
  sourceUrls: string[];
}

const HomePage = () => {
  const { selectedFont, handleFontChange } = useFont();
  const [word, setWord] = useState<string>("");
  const [results, setResults] = useState<DictionaryAPIResponse | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
        setErrorMessage("Word not found");
        return;
      }
      const data: DictionaryAPIResponse[] = await response.json();
      setResults(data[0]);
      setNotFound(false);
      setInputError(false);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    if (inputError && e.target.value.trim() !== "") {
      setInputError(false);
      setErrorMessage("");
    }
  };

  return (
    <div
      className={`container mx-auto w-full h-full min-h-screen ${selectedFont.toLowerCase()} bg-white dark:bg-black text-black dark:text-white px-4 sm:px-6 lg:px-8`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-between w-full max-w-lg items-center mt-10 space-x-4">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="38"
              viewBox="0 0 34 38"
              className="text-3xl text-gray-500 w-8 h-8 sm:w-10 sm:h-10"
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
                className="text-purple-500 cursor-pointer w-3 h-2 sm:w-4 sm:h-3"
              >
                <path
                  fill="none"
                  stroke="#A445ED"
                  strokeWidth="1.5"
                  d="m1 1 6 6 6-6"
                />
              </svg>
              <div className="absolute right-0 top-5 hidden group-hover:block w-40 shadow-lg bg-white dark:bg-black text-[#1F1F1F] dark:text-white dark:shadow-purple-500 dark:shadow-2xl rounded-md z-10">
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
            <div className="ml-2 dark:text-[#A445ED]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-lg mt-4">
          <input
            value={word}
            onChange={handleInputChange}
            type="text"
            className={`w-full bg-gray-200 dark:bg-[#3A3A3A] dark:text-white border ${
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
              className="w-4 h-4 sm:w-5 sm:h-5"
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
          <p className="text-red-500 font-bold text-xl sm:text-2xl lg:text-3xl">
            {errorMessage}
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
            {results.meanings.map((meaning, index) => (
              <ContentDisplay
                key={index}
                partOfSpeech={meaning.partOfSpeech}
                definitions={meaning.definitions}
                synonyms={meaning.synonyms}
              />
            ))}

            <p className="mt-4 flex mb-4 text-sm sm:text-base">
              Source:
              <a
                href={results.sourceUrls[0]}
                className="text-[#2D2D2D] underline flex items-center ml-2 mb-3 dark:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {results.sourceUrls[0]}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
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
        {errorMessage && !inputError && !notFound && !results && (
          <p className="text-red-500 font-bold text-xl sm:text-2xl lg:text-3xl">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
