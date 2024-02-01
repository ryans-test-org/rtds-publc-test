import * as path from "path";
import { StorybookConfig } from '@storybook/angular';
const config: StorybookConfig = {
  stories: [
    '../src/app/rtds-welcome.component.stories.ts',
    '../../../libs/angular/**/*.stories.mdx',
    '../../../libs/angular/**/*.stories.ts',
    // ...uiComponentsMain.stories,
    '../src/stories/**/*.stories.mdx',
    '../src/stories/**/*.stories.ts',
  ],
  addons: [
    { name: 'storybook-design-token', options: { preserveCSSVars: true } },
    '@storybook/addon-essentials',
    '@storybook/blocks',
    // {
    //   name: '@storybook/addon-storysource',
    //   options: {
    //     rule: {
    //       test: [/^.*stories.*$/], //This is default
    //       include: [path.resolve(__dirname, './libs/angular/src/lib/components/**/'),path.resolve(__dirname, '../src/app/app.component.stories.ts')], // You can specify directories
    //     }
    //   },
    // },
    '@geometricpanda/storybook-addon-badges',
    '@storybook/preset-scss',
    'storybook-addon-themes',
    "storybook-addon-pseudo-states",
    '@storybook/addon-a11y',

  ],
  docs: {
    autodocs: true,
    defaultName: 'Docs',
  },
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
