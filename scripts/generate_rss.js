import fs from "fs";
import path from "path";
import { parseMetadataDir, metadataDescendingSorter } from "./utils.js";

const rssItemTemplate = `<item><title>{{ RSS_ITEM_TITLE }}</title><link>{{ RSS_ITEM_LINK }}</link><description>{{ RSS_ITEM_DESCRIPTION }}</description><pubDate>{{ RSS_ITEM_PUBLICATION_DATE }}</pubDate><language>{{ RSS_ITEM_LANGUAGE }}</language>{{ RSS_ITEM_CATEGORIES }}</item>`;
const rssItemCategoryTemplate = `<category>{{ RSS_ITEM_CATEGORY }}</category>`;

export function generateRSS(inputDirPath, outputDirPath, templateFilePath, rssFileName, feedSourceDomain, feedSourceDir) {
  let items = [];
  const metadataList = parseMetadataDir(inputDirPath).sort(metadataDescendingSorter);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);

  fs.mkdirSync(outputDir, { recursive: true });

  for (const metadata of metadataList) {
    let categories = [];

    for (const category of metadata.category.sort()) {
      categories.push(
        rssItemCategoryTemplate
          .replace("{{ RSS_ITEM_CATEGORY }}", category)
      );
    }

    const item = rssItemTemplate
      .replace("{{ RSS_ITEM_TITLE }}", metadata.title)
      .replace("{{ RSS_ITEM_LINK }}", `https://${feedSourceDomain}/${feedSourceDir}/${metadata.path}.html`)
      .replace("{{ RSS_ITEM_DESCRIPTION }}", metadata.description) // To ensure that the date format conforms with RFC 822
      .replace("{{ RSS_ITEM_PUBLICATION_DATE }}", new Date(metadata.created).toUTCString())
      .replace("{{ RSS_ITEM_LANGUAGE }}", metadata.language)
      .replace("{{ RSS_ITEM_CATEGORIES }}", categories.join(""));

    items.push(item);
  }

  const template = fs.readFileSync(templateFile, "utf8");

  const xml = template
    .replace("{{ RSS_ITEM }}", items.join("\n"));

  const outputPath = path.join(outputDir, rssFileName);

  fs.writeFileSync(outputPath, xml, "utf8");

  console.log(`Generated ${outputPath}`);
}
