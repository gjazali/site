import fs from "fs";
import path from "path";
import ejs from "ejs";
import { parseTimestamp, parseMetadataDir, metadataDescendingSorter, minifyHTML } from "./utils.js";
import { navbar, footer } from "./components.js";

export async function generatePostList(inputDirPath, outputDirPath, templateFilePath) {
  const metadataList = parseMetadataDir(inputDirPath).sort(metadataDescendingSorter);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);
  const template = fs.readFileSync(templateFile, "utf8");

  fs.mkdirSync(outputDir, { recursive: true });

  const data = {
    navbar: navbar,
    footer: footer,
    metadataList: metadataList,
    parseTimestamp: parseTimestamp,
  }

  const html = ejs.render(template, data)
  const outputPath = path.join(outputDir, "index.html");
  const minifiedHTML = await minifyHTML(html);

  fs.writeFileSync(outputPath, minifiedHTML, "utf8");

  console.log(`Generated ${outputPath}`);
}
