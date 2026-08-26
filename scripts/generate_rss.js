import fs from "fs";
import path from "path";
import ejs from "ejs";
import {
  config,
  resolvePageTitle,
  resolveTemplatePath,
  resolveContentPath,
  resolveOutputPath
} from "./config.js";
import { parseMetadataDir, metadataDescendingSorter } from "./utils.js";

export function generateRSS(section) {
  const metadataList = parseMetadataDir(resolveContentPath(section.route))
    .sort(metadataDescendingSorter);
  const outputDir = path.resolve(resolveOutputPath(section.route));
  const templateFile = path.resolve(
    resolveTemplatePath(section.feed.template)
  );

  fs.mkdirSync(outputDir, { recursive: true });

  const template = fs.readFileSync(templateFile, "utf8");

  const data = {
    config: config,
    feedTitle: resolvePageTitle({ title_page_name: section.heading }),
    feedDescription: section.feed.description,
    feedBaseUrl: `${config.site.base_url}/${section.route}`,
    items: metadataList,
  }

  const xml = ejs.render(template, data);
  const outputPath = path.join(outputDir, section.feed.output_name);

  fs.writeFileSync(outputPath, xml, "utf8");

  console.log(`Generated ${outputPath}`);
}
