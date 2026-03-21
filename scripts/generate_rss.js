import fs from "fs";
import path from "path";
import ejs from "ejs";
import { parseMetadataDir, metadataDescendingSorter } from "./utils.js";

export function generateRSS(inputDirPath, outputDirPath, templateFilePath, rssFileName, feedSourceDomain, feedSourceDir) {
  const metadataList = parseMetadataDir(inputDirPath).sort(metadataDescendingSorter);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);

  fs.mkdirSync(outputDir, { recursive: true });

  const template = fs.readFileSync(templateFile, "utf8");

  const data = {
    feedSourceDomain: feedSourceDomain,
    feedSourceDir: feedSourceDir,
    items: metadataList,
  }

  const xml = ejs.render(template, data);
  const outputPath = path.join(outputDir, rssFileName);

  fs.writeFileSync(outputPath, xml, "utf8");

  console.log(`Generated ${outputPath}`);
}
