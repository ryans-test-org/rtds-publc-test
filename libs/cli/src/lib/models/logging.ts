import colors from "colors";
import { Listr } from "listr2";

export const introLogging = (version: string) => {
  console.log(
    colors.magenta(`
  Welcome to`),
    colors.cyan(`
  ██████╗░████████╗██████╗░░██████╗
  ██╔══██╗╚══██╔══╝██╔══██╗██╔════╝
  ██████╔╝░░░██║░░░██║░░██║╚█████╗░
  ██╔══██╗░░░██║░░░██║░░██║░╚═══██╗
  ██║░░██║░░░██║░░░██████╔╝██████╔╝
  ╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═════╝░`), colors.magenta(`
  Version ${version}`));
};

export const printPackageWarning = () => {
  console.log(colors.red("Warning, run the CLI in the same directory as your ") + colors.bgRed("package.json"));
};

const timeout = (ms: number) => {
  return new Promise(resolve => {
      const wait = setTimeout(() => {
        clearTimeout(wait);
        resolve("Resolved");
      }, ms);
    }
  );
};

export async function timedMessage(title: string, timer: number): Promise<void> {
  const task = new Listr<any>(
    [
      {
        title: title,
        task: async (): Promise<void> => {
          await timeout(timer);
        },
        options: {
          showTimer: true
        }
      }
    ],
    {concurrent: false}
  );
  await task.run();
}
