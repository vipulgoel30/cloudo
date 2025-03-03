// Core imports
import { readFile, writeFile } from "node:fs/promises";

// User imports
import { errLogger } from "@mono/utils";

type StringArrObj = Record<string, string[]>;
type StringObj = Record<string, string>;

const getCommandLineArgs = (): StringArrObj =>
  process.argv.reduce((acc: StringArrObj, arg: string) => {
    const splitAt: number = arg.lastIndexOf("=");
    return {
      ...acc,
      ...(splitAt !== -1 && {
        [`${arg.slice(0, splitAt).trim()}`]: arg
          .slice(splitAt + 1)
          .trim()
          .split(","),
      }),
    };
  }, {});

const processFile = async (file: string, payload: StringObj, isExpand: boolean = false): Promise<StringObj> => {
  try {
    const content: string = await readFile(file, "utf-8");
    const properties: string[] = content.split("\n");

    for (const propertie of properties) {
      if (!propertie.trim()) continue;
      if (propertie.trim().startsWith("#")) continue;

      const splitAt: number = propertie.indexOf("=");
      if (splitAt === -1) throw new Error("Unexpected format. Expected format {KEY} = {VALUE}");

      const key: string = propertie.slice(0, splitAt - 1).trim();
      let value: string = propertie
        .slice(splitAt + 1)
        .trim()
        .replaceAll('"', "");

      if (isExpand) {
        value = value.replace(new RegExp(/\${([\w]*)}/, "g"), (match, group) => payload[group] ?? match);
      }

      payload[`${key}`] = value;
    }
  } catch (err) {
    const msg: string = err instanceof Error ? err.message : "Unknown error";
    errLogger(err, `Error in processing file : ${file} : `);
  }

  return payload;
};

const createEnv = async (payload: StringObj) => {
  const content: string = Object.entries(payload)
    .map(([key, value]: [string, string]) => `${key}=${value}`)
    .join("\n");

  await writeFile(".env", content, "utf-8");
};

const processEnvTemplate = `
   declare global {
        namespace NodeJS {
            interface ProcessEnv {
                [key: string]: string;
                {PLACEHOLDER}
            }
        }
    }

export { };
`;
const createProcessEnv = async (payload: StringObj) => {
  const content: string = Object.entries(payload)
    .map(([key, value]: [string, string]) => `${key}:string`)
    .join("\n");

  await writeFile("./process-env.d.ts", processEnvTemplate.replace("{PLACEHOLDER}", content), "utf-8");
};

const generateEnv = async () => {
  let payload: StringObj = {};
  const { "--env": envFile, "--env-expand": envExpandFile }: { "--env"?: string[]; "--env-expand"?: string[] } =
    getCommandLineArgs();

  envFile && (await Promise.all(envFile.map((file: string) => processFile(file, payload))));
  envExpandFile && (await Promise.all(envExpandFile.map((file: string) => processFile(file, payload, true))));

  await createEnv(payload);
  await createProcessEnv(payload);
};

generateEnv();
