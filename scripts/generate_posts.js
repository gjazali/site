import fs from "fs";
import path from "path";
import ejs from "ejs";
import MarkdownIt from "markdown-it";
import MarkdownItFootnote from "markdown-it-footnote";
import markdownItMathTemml from "markdown-it-math/temml";
import {
  config,
  resolveTemplatePath,
  resolveContentPath,
  resolveOutputPath
} from "./config.js";
import { buildPageData } from "./page_data.js";
import { parseTimestamp, minifyHTML } from "./utils.js";

export async function generatePosts(section) {
  const md = new MarkdownIt(
    {
      html: config.markdown.html,
      linkify: config.markdown.linkify,
      typographer: config.markdown.typographer
    }
  )
    .use(MarkdownItFootnote)
    .use(markdownItMathTemml);

  const inputDir = path.resolve(resolveContentPath(section.route));
  const outputDir = path.resolve(resolveOutputPath(section.route));
  const templateFile = path.resolve(resolveTemplatePath(section.post_template));

  if (!fs.existsSync(inputDir)) {
    console.log("Input directory doesn't exist, skipping generation");
    return;
  }

  const entries = fs.readdirSync(inputDir, { withFileTypes: true });
  const markdownFiles = entries.filter(
    (e) => e.isFile() && e.name.endsWith(".md")
  );

  if (markdownFiles.length === 0) {
    console.log("No markdown files in input directory, skipping generation");
    return;
  }

  const template = fs.readFileSync(templateFile, "utf8");

  fs.mkdirSync(outputDir, { recursive: true });
  const files = fs.readdirSync(inputDir);

  const compiled = ejs.compile(template);

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const markdown = fs.readFileSync(
      path.join(inputDir, file),
      "utf8"
    );

    const rendered = md.render(markdown);

    const metadataFile = fs.readFileSync(
      path.join(
        inputDir,
        file.replace(/\.md$/, ".json")
      ),
      "utf8"
    );
    const metadata = JSON.parse(metadataFile);

    const data = buildPageData(
      { title: metadata.title, heading: section.heading },
      {
        data: metadata,
        postListPath: section.route,
        parseTimestamp: parseTimestamp,
        content: rendered
      }
    );

    const html = compiled(data)

    const outputPath = path.join(
      outputDir,
      `${metadata.path}.html`
    );

    const minifiedHTML = await minifyHTML(html);

    fs.writeFileSync(outputPath, minifiedHTML, "utf8");

    console.log(`Generated ${outputPath}`);
  }
}
