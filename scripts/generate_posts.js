import fs from "fs";
import path from "path";
import { parseTimestamp } from "./utils.js";
import MarkdownIt from "markdown-it";
import MarkdownItFootnote from "markdown-it-footnote";

export function generatePosts(inputDirPath, outputDirPath, templateFilePath, postListName, postListPath) {
  const md = new MarkdownIt()
    .use(MarkdownItFootnote);

  const inputDir = path.resolve(inputDirPath);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);

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

    const html = template
      .replace("{{ POST_CONTENT }}", rendered)
      .replace("{{ POST_TITLE }}", metadata.title)
      .replace("{{ POST_TITLE_FOR_NAVIGATION }}", metadata.title)
      .replace("{{ POST_AUTHOR }}", metadata.author)
      .replace("{{ POST_CREATED }}", parseTimestamp(metadata.created))
      .replace("{{ POST_MODIFIED }}", parseTimestamp(metadata.modified))
      .replace("{{ POST_LIST_NAME }}", postListName)
      .replace("{{ POST_LIST_PATH }}", postListPath);

    const outputPath = path.join(
      outputDir,
      `${metadata.path}.html`
    );

    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`Generated ${outputPath}`);
  }
}
