import fs from "fs";
import path from "path";
import { parseTimestamp } from "./utils.js";

const itemTemplate = `<div class="c-content-box c-e-content-box-post-list"><div class="c-content-title"><p><a href="/{{ POST_PATH }}">{{ POST_TITLE }}</a></p></div><div class="c-content-subtitle"><p>{{ POST_CREATED }}</p></div></div>`;

export function generatePostList(inputDirPath, outputDirPath, templateFilePath, postListDirPath) {
  let items = [];
  const inputDir = path.resolve(inputDirPath);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);

  if (!fs.existsSync(inputDir)) {
    console.log("Input directory doesn't exist, skipping generation");
    return;
  }

  const entries = fs.readdirSync(inputDir, { withFileTypes: true });
  const jsonFiles = entries.filter(
    (e) => e.isFile() && e.name.endsWith(".json")
  );

  if (jsonFiles.length === 0) {
    console.log("No metadata (JSON) files in input directory, skipping generation");
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const metadataFile = fs.readFileSync(
      path.join(inputDir, file),
      "utf8"
    );

    const metadata = JSON.parse(metadataFile);

    const item = itemTemplate
      .replace("{{ POST_PATH }}", `${postListDirPath}/${metadata.path}`)
      .replace("{{ POST_TITLE }}", metadata.title)
      .replace("{{ POST_CREATED }}", parseTimestamp(metadata.created));

    items.push(item);
  }

  const template = fs.readFileSync(templateFile, "utf8");

  const html = template
    .replace("{{ POST_LIST }}", items.join("\n"));

  const outputPath = path.join(outputDir, "index.html");

  fs.writeFileSync(outputPath, html, "utf8");

  console.log(`Generated ${outputPath}`);
}
