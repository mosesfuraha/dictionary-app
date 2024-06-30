import { useFont } from "../context/FontContext";

const ContentDisplay = ({ partOfSpeech, definitions }) => {
  const { selectedFont } = useFont();

  return (
    <div className="my-3 w-full max-w-lg">
      <div className="flex items-center text-lg font-bold font-serif mb-3">
        <p>{partOfSpeech}</p>
        <hr className="w-full ml-10 border-gray-400" />
      </div>
      <div className="mt-4">
        <p className="text-gray-500">Meaning</p>
        <ul
          className={`px-10 text-gray-800 text-sm space-y-4 ${
            selectedFont.toLowerCase() === "sans"
              ? "font-sans"
              : selectedFont.toLowerCase() === "mono"
              ? "font-mono"
              : "font-serif"
          }`}
        >
          {definitions.map((definition, index) => (
            <li key={index} className="flex flex-col space-y-2">
              <div className="flex items-start space-x-4">
                <span className="text-purple-500 text-2xl">•</span>
                <span>{definition.definition}</span>
              </div>
              {definition.example && (
                <div className="flex items-start space-x-4">
                  <span className="text-gray-500 text-sm ml-6">Example:</span>
                  <span className="italic">"{definition.example}"</span>
                </div>
              )}
              {definition.synonyms.length > 0 && (
                <div className="flex items-start space-x-4">
                  <span className="text-gray-500 text-sm ml-6">Synonyms:</span>
                  <span>{definition.synonyms.join(", ")}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentDisplay;
