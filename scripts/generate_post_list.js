import fs from "fs";
import path from "path";
import { parseTimestamp, parseMetadataDir, metadataDescendingSorter, minifyHTML } from "./utils.js";
import { navbar, footer, postItemTemplate } from "./components.js";

export async function generatePostList(inputDirPath, outputDirPath, templateFilePath, postListDirPath) {
  let items = [];
  const metadataList = parseMetadataDir(inputDirPath).sort(metadataDescendingSorter);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);

  fs.mkdirSync(outputDir, { recursive: true });

  for (const metadata of metadataList) {
    const item = postItemTemplate
      .replace("{{ POST_PATH }}", `${postListDirPath}/${metadata.path}`)
      .replace("{{ POST_TITLE }}", metadata.title)
      .replace("{{ POST_CREATED }}", parseTimestamp(metadata.created))
      .replace("{{ POST_AUTHOR }}", metadata.author)
      .replace("{{ POST_DESCRIPTION }}", metadata.description)
      .replace("{{ POST_CATEGORY }}", metadata.category.sort().join(", "));

    items.push(item);
  }

  const template = fs.readFileSync(templateFile, "utf8");

  const html = template
    .replace("{{ COMPONENT_NAVBAR }}", navbar)
    .replace("{{ COMPONENT_FOOTER }}", footer)
    .replace("{{ POST_LIST }}", items.join("\n"));

  const outputPath = path.join(outputDir, "index.html");

  const minifiedHTML = await minifyHTML(html);

  fs.writeFileSync(outputPath, minifiedHTML, "utf8");

  console.log(`Generated ${outputPath}`);
}
