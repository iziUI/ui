import React from 'react';

import type { StoryFn, Decorator, Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { DocsContainer } from '@storybook/blocks';

import { createTheme } from '@iziui/core/theme';

import ThemeProvider from '../src/theme/ThemeProvider';
import Doc from './Doc';

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