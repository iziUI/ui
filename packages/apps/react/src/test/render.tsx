import type { PropsWithChildren, ReactElement } from 'react';

import { render as testingLibraryRender, type RenderOptions } from '@testing-library/react';

import { createTheme, type ThemeBuilded } from '@iziui/core/theme';

import { ThemeContext } from '@/theme/ThemeProvider';

export * from '@testing-library/react';

type TestRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  theme?: ThemeBuilded;
};

export function render(
  ui: ReactElement,
  { theme = createTheme(), ...options }: TestRenderOptions = {},
) {
  const value = {
    theme,
    updateTheme: () => undefined,
  };

  function Wrapper({ children }: PropsWithChildren) {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  }

  return testingLibraryRender(ui, { ...options, wrapper: Wrapper });
}
