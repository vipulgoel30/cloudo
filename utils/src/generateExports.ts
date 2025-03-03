// Core imports
import { readdir, writeFile } from "fs/promises";

// User imports
import { errLogger } from "./functions/errLogger.js";

const EXCLUDED_FILES: string[] = ["index.ts", "generateExports.ts"];
const SRC_DIR: string = "./src";
const OUT_FILE: string = "./src/index.ts";

const generateExports = async () => {
  try {
    const result: string[] = await readdir(SRC_DIR, { recursive: true });
    const payload: string = result
      .map((file: string) => {
        if (!file.includes(".ts") || EXCLUDED_FILES.includes(file)) return "";
        return `export * from "./${file.replaceAll("\\", "/").replace(".ts", ".js")}"`;
      })
      .join("\n");

    await writeFile(OUT_FILE, payload);
  } catch (err) {
    errLogger(err, "Error in generating index.ts");
  }
};

generateExports();
