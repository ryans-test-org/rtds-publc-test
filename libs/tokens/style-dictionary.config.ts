import { Config } from 'style-dictionary';

// If you need to add multiple configutations Config[] is supported
const config: Config | Config[] = {
  source: ['src/tokens/**/**/*.json'],
  platforms: {
    scss: {
      prefix: 'rtds',
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/hex'],
      transformGroup: 'tokens-scss',
      buildPath: 'scss/',
      options: {
        outputReferences: true,
        deleteOutputPath: true
      },
      files: [
        {
          destination: '_tokens.scss',
          format: 'token_category',
          options: {
            fileHeader: 'rtds_token_header',
            theme: 'standard',
          },
        },
        {
          destination: `_tokens-dark.scss`,
          format: `token_category`,
          options: {
            fileHeader: 'rtds_token_header',
            theme: 'dark',
          },
          filter: (token) =>
            token.darkValue && token.attributes.category === `theme`,
        },
        {
          destination: '_tokens-sass.scss',
          format: 'scss/variables'
        },
        {
          destination: '_tokens-sass-map.scss',
          format: 'scss/map-deep',
        },
      ],
      actions: ['copy_assets_files'],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'js/',
      files: [
        {
          format: 'javascript/es6',
          destination: 'tokens.js',
        },
      ],
    },
    object: {
      transformGroup: 'js',
      buildPath: 'object/',
      files: [
        {
          format: 'javascript/module',
          destination: 'tokens.js',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'ts/',
      files: [
        {
          format: 'javascript/es6',
          destination: 'tokens.ts',
        },
        {
          format: 'typescript/es6-declarations',
          destination: 'tokens.d.ts',
        },
      ],
    }
  },
};

export default config;
