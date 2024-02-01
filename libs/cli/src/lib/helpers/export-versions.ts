import fs from "fs";
import { packageDirectoryChecker } from "./file-checker.js";
import { ThirdPartyPackage } from "../models/packages.js";

"use strict";

export interface PackageVersions {
  packageName: string,
  version: string,
  type: string
}

const packages = (): Promise<PackageVersions[]> => {
  return new Promise((resolve, reject) => {
    const result: PackageVersions[] = [];
    fs.readFile("../../package.json", "utf-8", (err, data: any) => {
      const process = (obj: any, type: any) => {
        obj && typeof obj === "object" && Object.keys(obj).forEach(function (package_) {
          result.push({
            packageName: package_,
            version: obj[package_],
            type: type,
          });
        });
      };
      process(JSON.parse(data).dependencies, "dependencies");
      process(JSON.parse(data).devDependencies, "devDependencies");
      const thirdPartyPackages: string[] = Object.values(ThirdPartyPackage);
      const r2 = result.filter(({packageName}) => {
        return thirdPartyPackages.includes(packageName);
      });

      resolve(r2);
    });
  });
};

const packageVersion = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    let version;
    let a = "";
    fs.readFile("package.json", "utf-8", (err, data: any) => {
      version = JSON.parse(data).version;
      a = "export const CLI_VERSION = \"" + version + "\";";
      resolve(a);
    });
  });
};


const dependenciesToArray = async () => {
  packageVersion().then((a) => {
    fs.writeFile("src/lib/version.ts", a, err => {
      if (err) {
        console.log("Error, could not write version.ts");
      }
      console.log("version.ts scripts written");
    });
  }).then(() => packages().then((res) => {
      let toInstall = "";
      res.forEach(r => {
        toInstall += r.packageName+'@'+r.version + " ";
      });
    toInstall.length ?
       fs.appendFile("src/lib/version.ts", "\r\nexport const THIRD_PARTY_PACKAGES = \"" + toInstall + "\";", err => {
      if (err) {
        console.log("Error, could not write version.ts");
      }
      console.log("third party versions script written");
    }) : null;
    })
  );

};

export const exportVersions = () => {
  packageDirectoryChecker().then(() => dependenciesToArray());
};
