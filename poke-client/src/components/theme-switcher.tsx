import { useState } from "react";
import { useTheme } from "@/contexts/theme";
import { cn } from "@/lib/utils";
import { Palette, Moon, Sun, Check } from "lucide-react";
import type { PokemonThemeId } from "@/constants/themes";

export function ThemeSwitcher() {
  const { theme, setTheme, isDark, setDark, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-1">
      <button
        type="button"
        onClick={() => setDark(!isDark)}
        className="p-2 rounded-full text-neutral-500 hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={isDark ? "Light mode" : "Dark mode"}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="p-2 rounded-full text-neutral-500 hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Change Pokémon theme"
          aria-label="Theme"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <Palette className="w-5 h-5" />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              aria-hidden
              onClick={() => setOpen(false)}
            />
            <div
              role="listbox"
              aria-label="Pokémon theme"
              className="absolute right-0 top-full mt-1 z-50 min-w-[10rem] py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg"
            >
              <p className="px-3 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Theme
              </p>
              {themes.map((t) => (
                <button
                  key={t.id}
                  role="option"
                  aria-selected={theme === t.id}
                  onClick={() => {
                    setTheme(t.id as PokemonThemeId);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-left text-sm font-medium transition-colors",
                    theme === t.id
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  )}
                >
                  <span
                    className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600 shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                  <span>{t.label}</span>
                  {theme === t.id && <Check className="w-4 h-4 ml-auto text-primary" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
