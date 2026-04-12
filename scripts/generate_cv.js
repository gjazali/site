import fs from "fs";
import path from "path";
import ejs from "ejs";
import { navbar, footer } from "./components.js";
import { minifyHTML, parseYearMonth, getTimeDifference, formatTimeDifference, wrapIntoParagraph } from "./utils.js";

export async function generateCV(templateFilePath, metadataFilePath, outputDirPath, outputFileName) {
  const templateFile = path.resolve(templateFilePath);
  const metadataFile = path.resolve(metadataFilePath);
  const outputDir = path.resolve(outputDirPath);

  if (!fs.existsSync(templateFile)) {
    console.log("Input file doesn't exist, skipping generation");
    return;
  }

  const template = fs.readFileSync(templateFile, "utf8");
  const metadata = JSON.parse(fs.readFileSync(metadataFile, "utf8"));

  fs.mkdirSync(outputDir, { recursive: true });

  const data = {
    navbar: navbar,
    footer: footer,
    data: metadata,
    parseYearMonth: parseYearMonth,
    getTimeDifference: getTimeDifference,
    formatTimeDifference: formatTimeDifference,
    wrapIntoParagraph: wrapIntoParagraph,
  }

  const html = ejs.render(template, data);

  const outputFilePath = path.join(
    outputDir,
    `${outputFileName}.html`
  );

  const minifiedHTML = await minifyHTML(html);

  fs.writeFileSync(outputFilePath, minifiedHTML, "utf8");

  console.log(`Generated ${outputFilePath}`);
}
