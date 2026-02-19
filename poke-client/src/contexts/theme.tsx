import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getStoredDark,
  getStoredTheme,
  POKEMON_THEMES,
  setStoredDark,
  setStoredTheme,
  type PokemonThemeId,
} from "@/constants/themes";

type ThemeContextValue = {
  theme: PokemonThemeId;
  setTheme: (theme: PokemonThemeId) => void;
  isDark: boolean;
  setDark: (dark: boolean) => void;
  themes: typeof POKEMON_THEMES;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<PokemonThemeId>(getStoredTheme);
  const [isDark, setDarkState] = useState(getStoredDark);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, isDark]);

  const setTheme = useCallback((next: PokemonThemeId) => {
    setThemeState(next);
    setStoredTheme(next);
  }, []);

  const setDark = useCallback((next: boolean) => {
    setDarkState(next);
    setStoredDark(next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, isDark, setDark, themes: POKEMON_THEMES }),
    [theme, setTheme, isDark, setDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
