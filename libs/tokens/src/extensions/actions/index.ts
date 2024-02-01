import {
  CustomActionsBuilder,
  ExtensionContext,
} from '@nxkit/style-dictionary/extensions';
import { copyFilesAction } from './copy_files_action';

const customActionsBuilder: CustomActionsBuilder = (
  extensionContext: ExtensionContext
) => {
  return {
    copy_assets_files: copyFilesAction(extensionContext),
  };
};

export default customActionsBuilder;
