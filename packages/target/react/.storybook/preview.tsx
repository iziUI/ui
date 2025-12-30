import React, { PropsWithChildren, useEffect } from 'react';

import { StoryFn, Decorator } from '@storybook/react';

import { createTheme, themeDefaultDark, themeDefaultLight } from '@iziui/core/theme';

import useTheme from '../src/theme/useTheme';
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
addLink('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

function WrappedComponent({ shouldDarken, children }: PropsWithChildren<{ shouldDarken: boolean }>) {
  const { updateTheme } = useTheme();

  useEffect(() => {
    updateTheme(createTheme(shouldDarken
      ? themeDefaultDark
      : themeDefaultLight
    ));
  }, [shouldDarken]);

  return children;
}

export const decorators: Decorator[] = [
  (Story: StoryFn) => {
    return (
      <ThemeProvider theme={createTheme()}>
        <WrappedComponent shouldDarken={false}>
          <Story />
        </WrappedComponent>
      </ThemeProvider>
    );
  },
];