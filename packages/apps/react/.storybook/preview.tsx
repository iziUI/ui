import { type PropsWithChildren, useEffect } from 'react';

import type { StoryFn, Decorator, Preview, StoryContext } from '@storybook/react';
import { DocsContainer } from '@storybook/blocks';

import {
  type Mode,
  createTheme,
  themeDefaultDark,
  themeDefaultLight
} from '@iziui/core/theme';

import ThemeProvider from '../src/theme/ThemeProvider';
import useTheme from '../src/theme/useTheme';
import Doc from './Doc';

import './style.css';

function StoryWrapper({ children, mode }: PropsWithChildren<{ mode: Mode }>) {
  const { updateTheme } = useTheme();

  useEffect(() => { handleMode(); }, [mode]);

  const handleMode = () => {
    updateTheme(createTheme(mode === 'dark'
      ? themeDefaultDark
      : themeDefaultLight
    ));

    const docsStories = document.querySelectorAll('.sb-show-main');

    docsStories.forEach((element) => {
      element.classList.remove('light', 'dark');
      element.classList.add(mode);
    });
  };

  return children;
}

export const decorators: Decorator[] = [
  (Story: StoryFn, context: StoryContext) => {
    const mode = context.globals.theme;

    return (
      <ThemeProvider theme={createTheme()}>
        <StoryWrapper mode={mode}>
          <Story />
        </StoryWrapper>
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <ThemeProvider theme={createTheme()}>
          <Doc />
        </ThemeProvider>
      ),
      container: ({ children, context }) => (
        <DocsContainer context={context}>
          {children}
        </DocsContainer>
      ),
    },
  },
};

export default preview;