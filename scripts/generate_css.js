import fs from "fs";
import path from "path";
import ejs from "ejs";
import { resolveAssetsHref } from "./config.js";
import { minifyCSS } from "./utils.js";

export function generateCSS(templateFilePath, outputDirPath, outputFileName) {
  const templateFile = path.resolve(templateFilePath);
  const outputDir = path.resolve(outputDirPath);

  if (!fs.existsSync(templateFile)) {
    console.log("Input file doesn't exist, skipping generation");
    return;
  }

  const css = ejs.render(
    fs.readFileSync(templateFile, "utf8"),
    { assetsHref: resolveAssetsHref() },
    { filename: templateFile }
  );

  fs.mkdirSync(outputDir, { recursive: true });

  const outputFilePath = path.join(
    outputDir,
    `${outputFileName}.css`
  );

  const minifiedCSS = minifyCSS(css);

  fs.writeFileSync(outputFilePath, minifiedCSS, "utf8");

  console.log(`Generated ${outputFilePath}`);
}
