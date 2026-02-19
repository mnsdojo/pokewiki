export const POKEMON_THEMES = [
  { id: "red", label: "Red", color: "oklch(0.55 0.22 27)" },
  { id: "blue", label: "Blue", color: "oklch(0.5 0.2 250)" },
  { id: "yellow", label: "Yellow", color: "oklch(0.78 0.18 85)" },
  { id: "green", label: "Green", color: "oklch(0.55 0.2 145)" },
  { id: "purple", label: "Purple", color: "oklch(0.55 0.25 300)" },
  { id: "gold", label: "Gold", color: "oklch(0.72 0.16 75)" },
] as const;

export type PokemonThemeId = (typeof POKEMON_THEMES)[number]["id"];

export const DEFAULT_THEME: PokemonThemeId = "red";

const STORAGE_KEY_THEME = "pokewiki-theme";
const STORAGE_KEY_DARK = "pokewiki-dark";

export function getStoredTheme(): PokemonThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const raw = localStorage.getItem(STORAGE_KEY_THEME);
  const valid = POKEMON_THEMES.some((t) => t.id === raw);
  return valid ? (raw as PokemonThemeId) : DEFAULT_THEME;
}

export function setStoredTheme(theme: PokemonThemeId): void {
  localStorage.setItem(STORAGE_KEY_THEME, theme);
}

export function getStoredDark(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(STORAGE_KEY_DARK);
  if (raw === null) return window.matchMedia("(prefers-color-scheme: dark)").matches;
  return raw === "1";
}

export function setStoredDark(dark: boolean): void {
  localStorage.setItem(STORAGE_KEY_DARK, dark ? "1" : "0");
}
