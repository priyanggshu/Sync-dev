import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage"

const SettingContext = createContext();

export const useSettingContext = () => {
    const context = useContext(SettingContext);
    if(!context) {
        throw new Error("useSettingContext must be used within a SettingContextProvider");
    }
    return context
};

const defaultSettings = {
    theme: "Dracula",
    language: "Javascript",
    fontSize: 16,
    fontFamily: "Space Mono",
};

function SettingContextProvider({ children }) {
    const { getItem } = useLocalStorage();
    const storedSettings = JSON.parse(getItem("settings") || "{}");

    const [theme, setTheme] = useState(storedSettings.theme ?? defaultSettings.theme)
    const [language, setLanguage] = useState(storedSettings.language ?? defaultSettings.language)
    const [fontSize, setFontSize] = useState(storedSettings.fontSize ?? defaultSettings.fontSize)
    const [fontFamily, setFontFamily] = useState(storedSettings.fontFamily ?? defaultSettings.fontFamily)

    const resetSettings = () => {
        setTheme(defaultSettings.theme);
        setLanguage(defaultSettings.language);
        setFontSize(defaultSettings.fontSize);
        setFontFamily(defaultSettings.fontFamily);
    };

    useEffect(() => {
        const updatedSettings = { theme, language, fontSize, fontFamily};
        localStorage.setItem("settings", JSON.stringify(updatedSettings));
    }, [theme, language, fontSize, fontFamily]);

    return (
        <SettingContext.Provider value={{
            theme, setTheme, language,setLanguage,
            fontSize, setFontSize, fontFamily, setFontFamily, resetSettings
        }}>
            { children }
        </SettingContext.Provider>
    );
}

export { SettingContextProvider };
export default SettingContext;