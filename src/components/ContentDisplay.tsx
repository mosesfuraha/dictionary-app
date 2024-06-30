import { useFont } from "../context/FontContext";

interface Definition {
  definition: string;
  example?: string;
}

interface ContentDisplayProps {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  partOfSpeech,
  definitions,
  synonyms,
}) => {
  const { selectedFont } = useFont();

  return (
    <div className="my-3 w-full max-w-lg">
      <div className="flex items-center text-lg font-bold font-serif mb-3">
        <p>{partOfSpeech}</p>
        <hr className="w-full ml-10 border-gray-400" />
      </div>
      <div className="mt-4">
        <p className="text-gray-500 dark:text-gray-300">Meaning</p>
        <ul
          className={`px-10 text-gray-800 dark:text-white text-sm space-y-4 ${
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
                  <span className="text-gray-500 dark:text-gray-300 text-sm ml-6">
                    Example:
                  </span>
                  <span className="italic">"{definition.example}"</span>
                </div>
              )}
            </li>
          ))}
        </ul>
        {synonyms && synonyms.length > 0 && (
          <div className="mt-4 flex gap-8">
            <p className="text-gray-500 dark:text-gray-300">Synonyms</p>
            <ul className="flex flex-wrap space-x-2">
              {synonyms.map((synonym, index) => (
                <li key={index} className="text-[#A445ed] font-bold">
                  <span className="hover:underline hover:font-bold cursor-pointer">
                    {synonym}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDisplay;
