import fs from "fs";
import path from "path";
import { parseTimestamp, parseMetadataDir, metadataDescendingSorter } from "./utils.js";

const itemTemplate = `<div class="c-content-box c-e-content-box-post-list"><div class="c-content-title"><p><a href="/{{ POST_PATH }}">{{ POST_TITLE }}</a></p></div><div class="c-content-subtitle"><p>{{ POST_CREATED }}</p></div></div>`;

export function generatePostList(inputDirPath, outputDirPath, templateFilePath, postListDirPath) {
  let items = [];
  const metadataList = parseMetadataDir(inputDirPath).sort(metadataDescendingSorter);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);

  fs.mkdirSync(outputDir, { recursive: true });

  for (const metadata of metadataList) {
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
