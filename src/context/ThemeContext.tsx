import React, { createContext } from "react";
import { useLocalStorage } from "react-use";

interface ThemeContextProps {
  themes: Record<AvailableThemes, string>;
  currentTheme: AvailableThemes;
}
const ThemeContext = createContext<ThemeContextProps | null>(null);

function changeTheme(theme: string, className: string) {
  const HTML = document.getElementsByTagName("html")[0];
  HTML.setAttribute("data-theme", theme);
  HTML.setAttribute("class", className);
}

export default function ThemeProvider({
  children,
  themes,
  currentTheme,
}: {
  themes: Record<AvailableThemes, string>;
  currentTheme: AvailableThemes;
  children: React.ReactNode;
}) {
  const [theme] = useLocalStorage<AvailableThemes>("theme", currentTheme);
  React.useEffect(() => {
    changeTheme(theme!, themes[theme!]);
  }, []);

  return (
    <ThemeContext.Provider value={{ themes, currentTheme: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  const [theme, setTheme] = useLocalStorage<AvailableThemes>(
    "theme",
    context.currentTheme as AvailableThemes
  );
  const handleTheme = (theme: AvailableThemes) => {
    changeTheme(theme, context.themes[theme]);
    setTheme(theme);
  };

  return [theme, handleTheme] as const;
};
type AvailableThemes = typeof availableThemes[number]["name"];
export const availableThemes = [
  {
    name: "default",
    color: "#000",
  },
  {
    name: "light",
    color: "#fff",
  },
  {
    name: "purple",
    color: "#01AB9D",
  },
  {
    name: "gold",
    color: "#F7A935",
  },
  {
    name: "brown",
    color: "#825e4a",
  },
  {
    name: "caramel",
    color: "#FFD19B",
  },
] as const;
