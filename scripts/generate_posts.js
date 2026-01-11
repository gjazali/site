import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

function extractTitle(markdown, md) {
  const tokens = md.parse(markdown, {});

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (
      token.type === "heading_open" &&
      token.tag === "h1"
    ) {
      const inline = tokens[i + 1];
      if (inline && inline.type === "inline") {
        return inline.content;
      }
    }
  }

  return null;
}

export function generatePosts(inputDirPath, outputDirPath, templateFilePath) {
  const md = new MarkdownIt();

  const inputDir = path.resolve(inputDirPath);
  const outputDir = path.resolve(outputDirPath);
  const templateFile = path.resolve(templateFilePath);

  const template = fs.readFileSync(templateFile, "utf8");

  const files = fs.mkdirSync(outputDir, { recursive: true });

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const markdown = fs.readFileSync(
      path.join(inputDir, file),
      "utf8"
    );

    const title = extractTitle(markdown, md) ?? file.replace(/\.md$/, "");

    const rendered = md.render(markdown);

    const html = template
      .replace("<!-- POST_CONTENT -->", rendered)
      .replace("{{ POST_TITLE }}", title);

    const outputPath = path.join(
      outputDir,
      file.replace(/\.md$/, ".html")
    );

    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`Generated ${outputPath}`);
  }
}
