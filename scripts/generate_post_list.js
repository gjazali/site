import fs from "fs";
import path from "path";
import ejs from "ejs";
import {
  resolveTemplatePath,
  resolveContentPath,
  resolveOutputPath,
  resolveFeedHref
} from "./config.js";
import { buildPageData } from "./page_data.js";
import {
  parseTimestamp,
  parseMetadataDir,
  metadataDescendingSorter,
  minifyHTML
} from "./utils.js";

export async function generatePostList(section) {
  const metadataList = parseMetadataDir(resolveContentPath(section.route))
    .sort(metadataDescendingSorter);
  const outputDir = path.resolve(resolveOutputPath(section.route));
  const templateFile = path.resolve(resolveTemplatePath(section.list_template));
  const template = fs.readFileSync(templateFile, "utf8");

  fs.mkdirSync(outputDir, { recursive: true });

  const data = buildPageData(
    { title_page_name: section.heading, heading: section.heading },
    {
      metadataList: metadataList,
      parseTimestamp: parseTimestamp,
      section: section,
      feedHref: resolveFeedHref(section)
    }
  );

  const html = ejs.render(template, data)
  const outputPath = path.join(
    outputDir,
    `${section.list_output_name}.html`
  );
  const minifiedHTML = await minifyHTML(html);

  fs.writeFileSync(outputPath, minifiedHTML, "utf8");

  console.log(`Generated ${outputPath}`);
}
