import { useTheme } from "../context/ThemeContext";

const ThemeBtn = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button className="p-2 rounded-lg" onClick={toggleTheme}>
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
          className={
            themeMode === "light" ? "fill-gray-400" : "fill-purple-500"
          }
        />
        <circle
          cx={themeMode === "light" ? "10" : "30"}
          cy="10"
          r="7"
          className="fill-white"
        />
      </svg>
    </button>
  );
};

export default ThemeBtn;
