#!/usr/bin/env node
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import colors from "colors";
import { execa, execaCommand } from "execa";
import inquirer from "inquirer";
import { packageDirectoryChecker } from "./helpers/file-checker.js";
import { printPackageWarning, timedMessage } from "./models/logging.js";
import { RTDSPackage, ThirdPartyPackage } from "./models/packages.js";
import { THIRD_PARTY_PACKAGES } from "./version.js";

const installAllRTDS = `npm i @rtds/{${Object.values(RTDSPackage)}} --save --save-prefix='~'`;
const installThirdPartyPackages = `${THIRD_PARTY_PACKAGES}`;
const installHooks = `husky`;
export const expressOrCustom = () => {
  inquirer
    .prompt([
      {
        type: "expand",
        message: "Do you want install all (a), or customise (c)?",
        name: "install",
        choices: [
          {
            key: "a",
            name: "All (recommended)",
            value: "all",
          },
          {
            key: "c",
            name: "Customise packages",
            value: "custom",
          }
        ],
      },
    ])
    .then((answers) => {
      answers.install === "all" ? expressSetup() : customSetup();
    });
};


export const expressSetup = async () => {
  installScripts(null, true);
  await execaCommand(installAllRTDS, {stdio: "inherit"}).then(() => {
    execaCommand(`npm i ${installThirdPartyPackages} ${installHooks} --save-dev`, {stdio: "inherit"})
      .catch(() => console.log(colors.red("Could not install, an error occurred")));
  }).catch(() => console.log(colors.red("Could not install, an error occurred")));
};

export const customSetup = () => {
  inquirer
    .prompt([
      {
        type: "checkbox",
        message: "Select the packages you wish to install",
        name: "packages",
        choices: [
          {
            name: "Angular components",
            value: RTDSPackage.ANGULAR_COMPONENTS
          },
          {
            name: "Icons",
            value: RTDSPackage.ICONS
          },
          {
            name: "Styles",
            value: RTDSPackage.STYLES
          },
          {
            name: "Tokens",
            value: RTDSPackage.TOKENS
          },
          {
            name: "Tooling (lint rules etc)",
            value: RTDSPackage.TOOLING
          }
        ],
        // Use if we want to force them to select something
        // validate(answer) {
        //   console.log(answer.);
        //   return true;
        // },
      },
    ])
    .then((answers) => {
      installPackages(answers).then(() => console.log(colors.green("Third party packages installed")));
    });
};

const installPackages = async (answers: any) => {
  const packages: string [] = [];
  const rtdsPackages: string [] = [];
  const answersSelected: string[] = answers.packages || [];
  answersSelected.includes(RTDSPackage.TOOLING) ? packages.push(ThirdPartyPackage.STYLELINT, ThirdPartyPackage.STYLELINT_CONFIG) : null;
  answersSelected.includes(RTDSPackage.ANGULAR_COMPONENTS) ? rtdsPackages.push(RTDSPackage.ANGULAR_COMPONENTS) : null;
  answersSelected.includes(RTDSPackage.ICONS) ? rtdsPackages.push(RTDSPackage.ICONS) : null;
  answersSelected.includes(RTDSPackage.STYLES) ? rtdsPackages.push(RTDSPackage.STYLES) : null;
  answersSelected.includes(RTDSPackage.TOKENS) ? rtdsPackages.push(RTDSPackage.TOKENS) : null;

  await installStaticFiles(answers).then(async () =>
    answersSelected.includes(RTDSPackage.TOOLING)
      ? await execaCommand(`npm i ${installThirdPartyPackages} ${installHooks} --save-dev`, {stdio: "inherit"})
      : await execaCommand(`npm i ${installHooks} --save-dev`, {stdio: "inherit"})
  );
  installScripts(answers);
};

const installScripts = async (answers: any, express?: boolean) => {
  const answersSelected: string[] = answers?.packages || [];
  await setupHuskyHooks();
  await setupGitIgnore();
  answersSelected.length ? packageDirectoryChecker().then(async () => {
    answersSelected.includes(RTDSPackage.TOOLING) || express ? (
        await execa("npm", ["pkg", "set", "scripts.lint:styles=stylelint \"**/**/*.scss\" --no-cache --color --fix"]
          , {stdio: "inherit"}).catch(() => console.log(colors.red("Could not install, an error occurred")))
      )
      : null;
  }).catch(() => printPackageWarning()) : console.log(colors.yellow("Nothing selected, aborting"));

};


export const installCliPrompt = () => {
  const prompt = inquirer.createPromptModule();
  return prompt([
    {
      type: "confirm",
      name: "installNow",
      message: "Do you want to update now?",
      default: true,
    },
  ]);
};

export const setupNPM = async () =>
  fs.readFile(".npmrc", "utf-8", async (err, data: any) => {
    data ? await modifyNpmRCFile() : await createNpmRCFile();
  });

export const installStaticFiles = async (answers?: any) => {
  const rootPath = dirname(fileURLToPath(import.meta.url));
  const answersSelected: string[] = answers.packages;
  answersSelected.includes(RTDSPackage.TOOLING) ? (
    fs.copyFile(`${rootPath}/resources/.stylelintrc`, `${process.cwd()}/.stylelintrc`, (err) => {
      if (err) throw err;
      timedMessage(colors.green("Copying .stylelintrc config file to root of project"), 1000);
    })
  ) : null;
};

const createNpmRCFile = async () => {
  const config = `
always-auth=true
strict-ssl=false
lockfile-version=2
node-options="--max_old_space_size=8192"
`
  await timedMessage(colors.yellow("Could not find .npmrc config file for this project, creating..."), 1000).then(async () =>
    await fs.writeFile(".npmrc", config, async (err) => {
      if (err) throw err;
      await timedMessage(colors.green(".npmrc file created successfully."), 500);
    })
  );
};

const modifyNpmRCFile = async () => {
  // TODO
  const config = "";
  await timedMessage(colors.green("Looking for project .npmrc file..."), 1000).then(() =>
    fs.readFile(".npmrc", async (err, data) => {
      data.indexOf("@rtds:registry") === -1 ?
        await timedMessage(colors.yellow("Found .npmrc config file for this project, modifying..."), 2000).then(
          async () =>
            fs.appendFile(".npmrc", config, async (err) => {
              await timedMessage(colors.green(".npmrc file modified successfully."), 500);
            })
        )
        : await timedMessage(colors.green(".npmrc found. rtds:registry key already exists, skipping"), 500);
    }));
};

const setupHuskyHooks = async () => {
  const updateCommand = "npx rtds-cli silent-update";
  if (!fs.existsSync(".husky")) {
    fs.mkdirSync(".husky");
  }
  await execaCommand("npx husky install").then(async () => (
      fs.readFile(".husky/pre-push", "utf-8", async (err, data: any) => {
          data ?
            data.indexOf(updateCommand) === -1 ?
              fs.appendFile(".husky/pre-push", updateCommand, err => {
                if (err) console.log(colors.red("Error, could not modify githook"));
                console.log(colors.green(".husky/pre-push modified"));
              }) : console.log(colors.yellow("pre-push hook already configured to check for updates, aborting")) :

            await execa("npx", ["husky", "add", ".husky/pre-push", updateCommand])
              .then(() => console.log(colors.green(".husky/pre-push hook created")))
              .catch(() => console.log(colors.red("Error, could not modify githook"))
              );

        },
      ),
        fs.readFile(".husky/post-merge", "utf-8", async (err, data: any) => {
            data ?
              data.indexOf(updateCommand) === -1 ?
                fs.appendFile(".husky/post-merge", updateCommand, err => {
                  if (err) console.log(colors.red("Error, could not modify githook"));
                  console.log(colors.green(".husky/post-merge modified"));
                }) : console.log(colors.yellow("post-merge hook already configured to check for updates, aborting")) :

              await execa("npx", ["husky", "add", ".husky/post-merge", updateCommand])
                .then(() => console.log(colors.green(".husky/post-merge hook created")))
                .catch(() => console.log(colors.red("Error, could not modify githook"))
                );

          },
        ),
        fs.readFile(".husky/post-merge", "utf-8", async (err, data: any) => {
            data ?
              data.indexOf(updateCommand) === -1 ?
                fs.appendFile(".husky/post-checkout", updateCommand, err => {
                  if (err) console.log(colors.red("Error, could not modify githook"));
                  console.log(colors.green(".husky/post-checkout modified"));
                }) : console.log(colors.yellow("post-checkout hook already configured to check for updates, aborting")) :

              await execa("npx", ["husky", "add", ".husky/post-checkout", updateCommand])
                .then(() => console.log(colors.green(".husky/post-checkout hook created")))
                .catch(() => console.log(colors.red("Error, could not modify githook"))
                );

          },
        )
    )
  );
};


const setupGitIgnore = async () => {
  const rtdsConfig = ".rtdsconfig";
  const gitIgnoreFile = ".gitignore";
  fs.readFile(gitIgnoreFile, "utf-8", async (err, data: any) => {
      data ?
        data.indexOf(rtdsConfig) === -1 ?
          fs.appendFile(gitIgnoreFile, rtdsConfig, err => {
            if (err) console.log(colors.red(`Error, could not modify ${gitIgnoreFile} file`));
            console.log(colors.green(`${gitIgnoreFile} modified`));
          }) : console.log(colors.yellow(`${gitIgnoreFile} already configured`)) :
        await fs.writeFile(gitIgnoreFile, `node_modules\n${rtdsConfig}`, async (err) => {
          if (err) throw err;
          await timedMessage(colors.green(`${gitIgnoreFile} file created successfully.`), 500);
        });
    },
  );
};
