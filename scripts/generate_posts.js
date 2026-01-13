import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
import MarkdownItFootnote from "markdown-it-footnote";

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

function parseTimestamp(input) {
  const normalized = input.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");

  const date = new Date(normalized);

  const datePart = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta", // matches GMT+07
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(date);

  const offset = "GMT+07:00";

  const result = `${datePart}, ${timePart} (${offset})`;

  return result;
}

export function generatePosts(inputDirPath, outputDirPath, templateFilePath) {
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

    const title = extractTitle(markdown, md) ?? file.replace(/\.md$/, "");

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
      .replace("{{ POST_TITLE }}", title)
      .replace("{{ POST_AUTHOR }}", metadata.author)
      .replace("{{ POST_CREATED }}", parseTimestamp(metadata.created))
      .replace("{{ POST_MODIFIED }}", parseTimestamp(metadata.modified));

    const outputPath = path.join(
      outputDir,
      file.replace(/\.md$/, ".html")
    );

    fs.writeFileSync(outputPath, html, "utf8");

    console.log(`Generated ${outputPath}`);
  }
}
