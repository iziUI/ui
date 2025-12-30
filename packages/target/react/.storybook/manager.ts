import { addons } from '@storybook/manager-api';

import iziuiTheme from './iziuiTheme';

addons.setConfig({
  theme: iziuiTheme,
});