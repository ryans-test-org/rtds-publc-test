import colors from "colors";
import { execaCommand } from "execa";
import * as ncu from "npm-check-updates";
import { createConfigFile, isDateGreater, readConfigFile, RTDSConfig, writeToConfigFile } from "./helpers/config-helper.js";
import { installCliPrompt } from "./installers.js";
import { timedMessage } from "./models/logging.js";

export const checkForPackageUpdates = (force?: boolean) => {
  readConfigFile().then((data) => {
    const config = JSON.parse(data) as RTDSConfig;
    force ? updatePackages(config) : isDateGreater(new Date(config.dateLastChecked), new Date(), 3) ? updatePackages(config) : console.log("checked recently, aborting");
  }).catch(async () => (await timedMessage(colors.yellow("Error, cannot find config file. Creating..."), 1000), await createConfigFile().then(()=> checkForPackageUpdates())));
};

export const checkForCliUpdates = (force?: boolean) => {
  readConfigFile().then((data) => {
    const config = JSON.parse(data) as RTDSConfig;
    force ? updateCLI(config) : isDateGreater(new Date(config.dateCLILastChecked), new Date(), 0) ? updateCLI(config) : console.log("checked recently, aborting");
  }).catch(async () => (await timedMessage(colors.yellow("Error, cannot find config file. Creating..."), 1000), await createConfigFile().then(()=> checkForCliUpdates())));
};


export const checkForUpdates = () => {
  readConfigFile().then((data) => {
    const config = JSON.parse(data) as RTDSConfig;
    isDateGreater(new Date(config.dateLastChecked), new Date(), 0) ? updatePackages(config) : console.log("checked recently, aborting");
  }).catch(async () => (await timedMessage(colors.yellow("Error, cannot find config file. Creating..."), 1000), await createConfigFile().then(()=> checkForUpdates())));
};


export const backgroundUpdateCheck = () => {
  readConfigFile().then((data) => {
    const config = JSON.parse(data) as RTDSConfig;
    isDateGreater(new Date(config.dateLastChecked), new Date(), 0) ?
      updateCLI(config, true).then(() => updatePackages(config, true)) : console.log("checked recently, aborting");
  }).catch(async () => (await timedMessage(colors.yellow("Error, cannot find config file. Creating..."), 1000), await createConfigFile().then(()=> backgroundUpdateCheck())));
};

const updateCLI = async (data: RTDSConfig, silent?: boolean) => {
  //As these are global, ncu cannot handle the upgrading of the packages, defer to execa
  console.log(colors.green("Checking for RTDS CLI updates...."));
  await ncu.run({
    filter: "@rtds/cli",
    interactive: false,
    format: ["repo"],
    upgrade: false,
    global: true,
    loglevel: ""
  }, {cli: true}).then((e) => {
    Object.entries(e as Record<string, unknown>).length ?
      silent ? console.log(colors.yellow(`There is an RTDS CLI update available, run ${colors.cyan("sudo npm install -g @rtds/cli@latest")}`)) :
      (installCliPrompt().then((answer) => answer.installNow ?
          installCliUpdate().then(() => {
            console.log(colors.green("RTDS CLI successfully updated")),
              writeToConfigFile({...data, dateCLILastChecked: new Date()});
          })
          : console.log(colors.yellow("Update cancelled. Install a.s.a.p to keep RTDS up to date")))
      )
      : !silent ? console.log(colors.green("RTDS CLI is up to date")) : null;
  }).catch(() => console.log(colors.red("Error, could not update CLI")));
};

const installCliUpdate = async () => {
  await execaCommand("sudo npm install -g @rtds/cli@latest", {stdio: "inherit"});
};

const updatePackages = async (data: RTDSConfig, silent?: boolean) => {
  //As these are non-global, ncu can handle the upgrading of the packages
  console.log(colors.green("Checking for RTDS package updates...."));
  await ncu.run({
    filter: "@rtds/*",
    reject: "@rtds/cli",
    interactive: !silent,
    format: ["group"],
    upgrade: !silent
  }).then((e) => {
    Object.entries(e as Record<string, unknown>).length ? (
        !silent ?
          (writeToConfigFile({...data, dateLastChecked: new Date()}),
            console.log(e, colors.green("RTDS packages successfully updated")))
          : console.log(colors.yellow(`There are RTDS package updates available, run ${colors.cyan("rtds-cli update")} to install latest`)))
      : !silent ? console.log(colors.yellow("No packages to update, exiting")) : null;
  }).catch(() => console.log(colors.red("Error, could not update CLI")));
};
