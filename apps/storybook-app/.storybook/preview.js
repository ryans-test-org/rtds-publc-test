import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

export const parameters = {
  backgrounds: {
    default: 'standard',
    values: [
      {
        name: 'standard',
        value: 'var(--rtds-color-grey-100)',
      },
      {
        name: 'darkMode',
        value: 'var(--rtds-color-blue-300)',
      },
    ],
  },
  designToken: {
    disable: true
  },
  options: {
    storySort: {
      order: ['Welcome', 'Foundation', 'Components'],
    },
  },
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'rtds-light', color: '#e3e5e8' },
      { name: 'dark', class: 'rtds_dark_theme', color: '#313c53' },
    ],
    target: 'html',
  },
};
