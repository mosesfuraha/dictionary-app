import { createContext, useContext, useState } from "react";

const FontContext = createContext();

export const useFont = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState("Sans");

  const handleFontChange = (font) => {
    setSelectedFont(font);
  };

  return (
    <FontContext.Provider value={{ selectedFont, handleFontChange }}>
      {children}
    </FontContext.Provider>
  );
};
