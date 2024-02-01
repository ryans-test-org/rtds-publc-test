#!/usr/bin/env node
import { Command } from "commander";
import { exportVersions } from "./helpers/export-versions.js";
import { packageDirectoryChecker } from "./helpers/file-checker.js";
import { initialise } from "./initalise.js";
import { setupNPM } from "./installers.js";
import { introLogging, printPackageWarning } from "./models/logging.js";
import { backgroundUpdateCheck, checkForCliUpdates, checkForPackageUpdates, checkForUpdates } from "./upgrade-checker.js";
import { CLI_VERSION } from "./version.js";

const program = new Command();

program
  .name("rtds-cli")
  .description("CLI for RTDS")
  .version(CLI_VERSION)
  .hook("preAction", (thisCommand) => {
    thisCommand.args[0] !== "silent-update" ? introLogging(CLI_VERSION) : null;
  })
  .action(() => {
    packageDirectoryChecker().then(() => {
      console.log("Type rtds-cli --help for options");
      backgroundUpdateCheck();
    }).catch(() => printPackageWarning());
  });

program
  .command("init") // sub-command name
  .alias("i") // alternative sub-command is `al`
  .description("Install the RTDS packages") // command description
  .option("--force", "force reinstall RTDS")
  .action((options) => {
    packageDirectoryChecker().then(async () => {
      await setupNPM().then(async () =>
        await initialise(options)
      );
    }).catch(() => printPackageWarning());
  });

program
  .command("update") // sub-command name
  .alias("u") // alternative sub-command is `u`
  .description("Check for RTDS package updates") // command description
  .option("--force", "force update packages")
  .action((options) => {
    packageDirectoryChecker().then(() => {
      checkForPackageUpdates(options);
    }).catch(() => printPackageWarning());
  });

program
  .command("cli-update") // sub-command name
  .alias("uc") // alternative sub-command is `uc`
  .description("Check for CLI updates") // command description
  .option("--force", "force cli update")
  .action((options) => {
    packageDirectoryChecker().then(() => {
      checkForCliUpdates(options);
    }).catch(() => printPackageWarning());
  });

program
  .command("silent-update") // sub-command name
  .alias("su") // alternative sub-command is `uc`
  .description("Poll for updates") // command description
  .action(() => {
    packageDirectoryChecker().then(() => {
      backgroundUpdateCheck();
    });
  });

program
  .command("export") // sub-command name
  .alias("e") // alternative sub-command is `uc`
  .description("Export versions") // command description
  .action(() => {
    exportVersions();
  });

program
  .command("test") // sub-command name
  .alias("e") // alternative sub-command is `uc`
  .description("Export versions") // command description
  .action(() => {
    packageDirectoryChecker().then(() =>
      backgroundUpdateCheck()
    )
  });

program.parse(process.argv);
