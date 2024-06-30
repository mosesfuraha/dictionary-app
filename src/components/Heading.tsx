import { useFont } from "../context/FontContext";

const Heading = ({ word, phonetic, audio }) => {
  const { selectedFont } = useFont();

  const playAudio = () => {
    if (audio) {
      new Audio(audio).play();
    }
  };

  return (
    <div className="flex justify-between items-center my-5 w-full max-w-lg">
      <div>
        <h3
          className={`font-bold text-3xl ${
            selectedFont.toLowerCase() === "sans"
              ? "font-sans"
              : selectedFont.toLowerCase() === "mono"
              ? "font-mono"
              : "font-serif"
          }`}
        >
          {word}
        </h3>
        <span className="block font-normal text-purple-500">{phonetic}</span>
      </div>
      {audio && (
        <button onClick={playAudio}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 75 75"
          >
            <g fill="#8F19E8" fillRule="evenodd">
              <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
              <path d="M29 27v21l21-10.5z" />
            </g>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Heading;
