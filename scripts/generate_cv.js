import fs from "fs";
import path from "path";
import ejs from "ejs";
import {
  resolveTemplatePath,
  resolveContentPath,
  resolveOutputPath
} from "./config.js";
import { buildPageData } from "./page_data.js";
import {
  minifyHTML,
  parseYearMonth,
  getTimeDifference,
  formatTimeDifference,
  wrapIntoParagraph
} from "./utils.js";

export async function generateCV(page) {
  const templateFile = path.resolve(resolveTemplatePath(page.template));
  const metadataFile = path.resolve(resolveContentPath(page.metadata));
  const outputDir = path.resolve(resolveOutputPath(page.output_directory));

  if (!fs.existsSync(templateFile)) {
    console.log("Input file doesn't exist, skipping generation");
    return;
  }

  const template = fs.readFileSync(templateFile, "utf8");
  const metadata = JSON.parse(fs.readFileSync(metadataFile, "utf8"));

  fs.mkdirSync(outputDir, { recursive: true });

  const data = buildPageData(page, {
    data: metadata,
    parseYearMonth: parseYearMonth,
    getTimeDifference: getTimeDifference,
    formatTimeDifference: formatTimeDifference,
    wrapIntoParagraph: wrapIntoParagraph
  });

  const html = ejs.render(template, data);

  const outputFilePath = path.join(
    outputDir,
    `${page.output_name}.html`
  );

  const minifiedHTML = await minifyHTML(html);

  fs.writeFileSync(outputFilePath, minifiedHTML, "utf8");

  console.log(`Generated ${outputFilePath}`);
}
