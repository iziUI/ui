import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  typescript: {
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../tsconfig.json'
    }
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = [
      ...(config.plugins || []),
      tsconfigPaths(),
    ];

    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@iziui/tokens/web/scss/main.scss" as *;
            @use "@iziui/styles/index.scss" as *;
          `,
        },
      },
    };

    // Improve monorepo package resolution
    config.resolve = {
      ...config.resolve,
      preserveSymlinks: true,
    };

    return config;
  },
};

export default config;