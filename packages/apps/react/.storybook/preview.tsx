import React from 'react';

import type { StoryFn, Decorator, Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { DocsContainer } from '@storybook/blocks';

import { createTheme } from '@iziui/core/theme';

import ThemeProvider from '../src/theme/ThemeProvider';

import './style.css';

export const decorators: Decorator[] = [
  (Story: StoryFn) => {
    return (
      <ThemeProvider theme={createTheme()}>
        <Story />
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      theme: themes.light,
      container: ({ children, context }) => (
        <DocsContainer context={context}>
          <ThemeProvider theme={createTheme()}>
            {children}
          </ThemeProvider>
        </DocsContainer>
      ),
    },
  },
};

export default preview;