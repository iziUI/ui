import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import type { ThemeBuilded } from '@iziui/core/theme';
import { createTheme, applyTheme, themeDefaultLight } from '@iziui/core/theme';

import '@iziui/styles/base/_base.scss';

export interface ThemeContextConfig {
  theme: ThemeBuilded;
  updateTheme: (theme: ThemeBuilded) => void;
}

export const ThemeContext = createContext<ThemeContextConfig>({
  theme: createTheme(themeDefaultLight),
  updateTheme: () => { },
});

type ThemeProviderProps = PropsWithChildren<{ theme: ThemeBuilded; }>
export default function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const [_theme, setTheme] = useState<ThemeBuilded>(theme);

  const context = useMemo<ThemeContextConfig>(() => ({
    theme: _theme,
    updateTheme: (newTheme: ThemeBuilded) => updateTheme(newTheme),
  }), [theme, _theme]);

  useEffect(() => { applyTheme(_theme); }, [_theme]);

  const updateTheme = (newTheme: ThemeBuilded) => { setTheme(newTheme); };

  return (
    <ThemeContext.Provider value={context}>
      {children}
    </ThemeContext.Provider>
  );
}

