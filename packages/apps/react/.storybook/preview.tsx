import React from 'react';

import type { StoryFn, Decorator } from '@storybook/react';

import { createTheme } from '@iziui/core/theme';

import ThemeProvider from '../src/theme/ThemeProvider';

import './style.css';

function addLink(url: string) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

addLink('https://unicons.iconscout.com/release/v4.0.8/css/line.css');
// eslint-disable-next-line max-len
// addLink('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

export const decorators: Decorator[] = [
  (Story: StoryFn) => {
    const aa = createTheme();
    console.log('aa', aa);
    return (
      <ThemeProvider theme={aa}>
        <Story />
      </ThemeProvider>
    );
  },
];