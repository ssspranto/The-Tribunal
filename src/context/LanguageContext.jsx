import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_LANGUAGE, getTranslation } from "../localization";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("tribunal_language") || DEFAULT_LANGUAGE
  );
  
  const t = getTranslation(language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem("tribunal_language", code);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
