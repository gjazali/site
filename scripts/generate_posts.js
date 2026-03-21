import fs from "fs";
import path from "path";
import ejs from "ejs";
import { parseTimestamp, minifyHTML } from "./utils.js";
import MarkdownIt from "markdown-it";
import MarkdownItFootnote from "markdown-it-footnote";
import markdownItMathTemml from "markdown-it-math/temml";
import { navbar, footer } from "./components.js";

export async function generatePosts(inputDirPath, outputDirPath, templateFilePath, postListName, postListPath) {
  const md = new MarkdownIt(
    {
      html: true,
      linkify: true,
      typographer: true
    }
  )
    .use(MarkdownItFootnote)
    .use(markdownItMathTemml);

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

    const data = {
      navbar: navbar,
      footer: footer,
      data: metadata,
      postListPath: postListPath,
      parseTimestamp: parseTimestamp,
      content: rendered,
    }

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
