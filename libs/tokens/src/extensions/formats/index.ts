import {
  CustomFormatsBuilder,
  ExtensionContext,
} from '@nxkit/style-dictionary/extensions';
import { Dictionary, Options, TransformedToken } from 'style-dictionary';
import dedent from 'ts-dedent';
enum Presenters {
  Animation = 'Animation',
  Border = 'Border',
  BorderRadius = 'BorderRadius',
  Color = 'Color',
  Easing = 'Easing',
  Empty = 'Empty',
  FontFamily = 'FontFamily',
  FontSize = 'FontSize',
  FontWeight = 'FontWeight',
  LetterSpacing = 'LetterSpacing',
  LineHeight = 'LineHeight',
  Opacity = 'Opacity',
  Shadow = 'Shadow',
  Spacing = 'Spacing'
}

// just get the token name from it, like: color
const extractTokenNameFromDictionaryName = (variable) => {
  if (variable.name) {
    const noPrefix = variable.name.replace('rtds-', '');
    const [, name] = noPrefix.match(/([^-]+)/);
    return name;
  }
};

// Capitalize first letter to respect the addon parser for finding the right Presenter
const sanitizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Capitalize first letter to respect the addon parser for finding the right Presenter
const getCategory = (token: TransformedToken) => {
  return token.comment ? `/* ${token.comment} */` : '';
};

const getThemeName = (options: Options) => {
  return options.theme && options.theme === 'dark'
    ? ':root.rtds_dark_theme {\n'
    : ':root {\n';
};

const getValue = (token, options: Options): boolean => {
  return options.theme && options.theme === 'dark' && token.darkValue
    ? token.darkValue
    : token.value;
};

const getToken = (category, dictionary, options) => {
  return dictionary.allTokens
    .filter((token: TransformedToken) => category === token.attributes.category)
    .map(
      (token) =>
        `--${token.name}: ${getValue(token, options)}; ${getCategory(token)}`
    )
    .join('\n');
};

const customFormatsBuilder: CustomFormatsBuilder = (
  extensionContext: ExtensionContext
) => {
  return {
    token_category: function ({ dictionary, platform, options, file }) {
      return (
        getThemeName(options) + getTokenGroups(dictionary, options) + '\n}'
      );
    },
  };
};

const getPresenter = (item) => {

  return (
    '\n' +
    dedent(`/**
              * @tokens ${sanitizeString(item)}
              * @presenter ${sanitizeString(getPresenterName(item))}
              */`) +
    '\n\n'
  );
};

const getTokenGroups = (dictionary: Dictionary, options: Options) => {
  const partialArrayItems = dictionary.allTokens.map(
    (item: TransformedToken) => {
      return item.attributes.category;
    }
  );
  let result = '';
  const uniqueCategories = new Set(partialArrayItems);
  uniqueCategories.forEach((category) => {
    result +=
      getPresenter(category) + getToken(category, dictionary, options) + '\n';
  });
  return result;
};

const getPresenterName = (item) => {
  switch (item) {
    case 'border':
      return Presenters.Border
    case 'borderRadius':
      return Presenters.BorderRadius
    case 'color':
    case 'theme':
      return Presenters.Color;
    case 'fontSize':
      return Presenters.FontSize;
    case 'fontFamily':
      return Presenters.FontFamily;
    case 'fontWeight':
      return Presenters.FontWeight;
    case 'lineHeight':
      return Presenters.LineHeight;
    case 'shadow':
      return Presenters.Shadow;
    default:
      return '';
  }
};

export default customFormatsBuilder;
