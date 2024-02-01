import * as path from 'path';
import { ExtensionContext } from '@nxkit/style-dictionary/extensions';
import * as fs from 'fs-extra';
import { Action, Dictionary, Platform } from 'style-dictionary';

export function copyFilesAction(extensionContext: ExtensionContext): Action {
  return {
    do: (dictionary: Dictionary, config: Platform) => {
      const assetsPath = path.join(config.buildPath);
      // eslint-disable-next-line no-console
      console.log(
        'Copying tokens build output to libs/styles/src/lib/sass/tokens'
      );
      fs.copySync(assetsPath, 'libs/styles/src/lib/sass/tokens');
    },
    undo: (dictionary: Dictionary, config: Platform) => {
      return;
    },
  };
}
