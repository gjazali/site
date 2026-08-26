import path from "path";
import { config, resolveTemplatePath } from "./config.js";
import { cleanOutputDir } from "./clean_output.js";
import { copyAssets } from "./copy_assets.js";
import { generateCSS } from "./generate_css.js";
import { generateGenericPage } from "./generate_generic_page.js";
import { generateCV } from "./generate_cv.js";
import { generatePosts } from "./generate_posts.js";
import { generatePostList } from "./generate_post_list.js";
import { generateRSS } from "./generate_rss.js";

const { directories, stylesheet, pages, cv, sections } = config;

console.log(`Cleaning output directory...`);
cleanOutputDir(directories.output);

console.log(`Copying assets...`);
copyAssets(
  directories.assets,
  path.join(directories.output, directories.output_assets)
);

console.log(`Generating stylesheet...`);
generateCSS(
  resolveTemplatePath(stylesheet.template),
  directories.output,
  stylesheet.output_name
);

for (const page of pages) {
  console.log(`Generating ${page.name}...`);
  await generateGenericPage(page);
}

console.log(`Generating ${cv.name}...`);
await generateCV(cv);

for (const section of sections) {
  console.log(`Generating ${section.route} posts...`);
  await generatePosts(section);

  console.log(`Generating ${section.route} post list...`);
  await generatePostList(section);

  if (section.feed != null) {
    console.log(`Generating ${section.route} RSS feed...`);
    generateRSS(section);
  }
}
