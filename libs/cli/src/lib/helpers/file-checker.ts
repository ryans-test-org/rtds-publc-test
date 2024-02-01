import fs from "fs";
import { printPackageWarning } from "../models/logging.js";

const path = "./package.json";

export const packageDirectoryChecker = () => {
  return fs.promises.access(path, fs.constants.F_OK)
}

export const configDirectoryChecker = () => {
  return fs.promises.access(path, fs.constants.F_OK)
    .then(() => console.log("exists:", path))
    .catch(() => printPackageWarning())
}
