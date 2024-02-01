import {
  CustomFileHeadersBuilder,
  ExtensionContext,
} from '@nxkit/style-dictionary/extensions';

const customFileHeadersBuilder: CustomFileHeadersBuilder = (
  extensionContext: ExtensionContext
) => {
  return {
    rtds_token_header: function (defaultMessage) {
      return [
        ...defaultMessage,
        `This file was generated from the @rtds/tokens package. To recreate file run 'npx nx build tokens'`,
        '/* stylelint-disable */',
      ];
    },
  };
};

export default customFileHeadersBuilder;
