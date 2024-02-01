// Config type
import fs from "fs";
import { CLI_VERSION } from "../version.js";

const configFileName = process.cwd() + "/.rtdsconfig";

export interface RTDSConfig {
  version: string,
  cliVersion: string,
  dateLastChecked: Date
  dateCLILastChecked: Date
}

const defaults: RTDSConfig = {
  version: "0.0.1",
  cliVersion: CLI_VERSION,
  dateLastChecked: new Date(),
  dateCLILastChecked: new Date()
};

export const checkIfConfigExits = (): boolean => fs.existsSync(configFileName);

export const createConfigFile = async () => {
  return fs.promises.writeFile(configFileName, JSON.stringify(defaults, null, 2))
};

export const readConfigFile = () => {
  return fs.promises.readFile(configFileName, 'utf8')
};

export const writeToConfigFile = (data: RTDSConfig) => {
  return fs.promises.writeFile(configFileName, JSON.stringify(data, null, 2))
};

// console.log('obj', obj);
// fs.writeFileSync(configFileName, JSON.stringify(defaults, null, 2), "utf-8");
/**
 * Check if d2 is greater than d1
 * @param {Date} d1 Date object
 * @param {Date} d2 Date object
 * @param {Number} days Optional number of days to add to d1
 */
export const isDateGreater = (d1: Date, d2: Date, days: number) => {
  d1 = new Date(d1);
  return +new Date(d2) > d1.setDate(d1.getDate() + (days || 0));
};
// console.log(new Date(obj.dateLastChecked))
// console.log(isDateGreater( new Date(obj.dateLastChecked),new Date(), 3))
