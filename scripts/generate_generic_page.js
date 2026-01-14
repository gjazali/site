import fs from "fs";
import path from "path";
import { navbar, footer } from "./components.js";
import { minifyHTML } from "./utils.js";

export async function generateGenericPage(templateFilePath, outputDirPath, outputFileName) {
  const templateFile = path.resolve(templateFilePath);
  const outputDir = path.resolve(outputDirPath);

  if (!fs.existsSync(templateFile)) {
    console.log("Input file doesn't exist, skipping generation");
    return;
  }

  const template = fs.readFileSync(templateFile, "utf8");

  fs.mkdirSync(outputDir, { recursive: true });

  const html = template
    .replace("{{ COMPONENT_NAVBAR }}", navbar)
    .replace("{{ COMPONENT_FOOTER }}", footer);

  const outputFilePath = path.join(
    outputDir,
    `${outputFileName}.html`
  );

  const minifiedHTML = await minifyHTML(html);

  fs.writeFileSync(outputFilePath, minifiedHTML, "utf8");

  console.log(`Generated ${outputFilePath}`);
}
