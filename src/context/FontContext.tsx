// FontContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FontContextProps {
  selectedFont: string;
  handleFontChange: (font: string) => void;
}

const FontContext = createContext<FontContextProps | undefined>(undefined);

export const FontProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFont, setSelectedFont] = useState<string>("Sans");

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  return (
    <FontContext.Provider value={{ selectedFont, handleFontChange }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = (): FontContextProps => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
