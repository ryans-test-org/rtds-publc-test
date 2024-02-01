import colors from "colors";
import { checkIfConfigExits, createConfigFile } from "./helpers/config-helper.js";
import { expressOrCustom } from "./installers.js";
import { timedMessage } from "./models/logging.js";

export const initialise = async (options: any) => {
  options.force ? await timedMessage("Recreating RTDS config file...", 2000).then(async () => await createConfigFile().then(() =>
      expressOrCustom())) :
    await timedMessage("Looking for RTDS config file...", 2000).then(async () =>
      checkIfConfigExits() ? console.log(`It looks like you have already initialised ${colors.cyan('RTDS')} for this project, run again with the`, colors.cyan("--force"), "flag to reinitialise") :
        await timedMessage(colors.yellow("No RTDS config file, creating..."), 500).then(async () =>
          await createConfigFile().then(() =>
            expressOrCustom())));
};
