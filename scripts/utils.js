import fs from "fs";
import path from "path";
import { minify } from "html-minifier-terser";

export function parseTimestamp(input) {
  const date = new Date(input);

  const result = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(date);

  return result;
}

export function parseMetadataDir(metadataDirPath) {
  let metadataList = [];

  const metadataDir = path.resolve(metadataDirPath);

  if (!fs.existsSync(metadataDir)) {
    console.log("Input directory doesn't exist, aborting parsing process");
    return;
  }

  const entries = fs.readdirSync(metadataDir, { withFileTypes: true });
  const jsonFiles = entries.filter(
    (e) => e.isFile() && e.name.endsWith(".json")
  );

  if (jsonFiles.length === 0) {
    console.log("No metadata (JSON) files in input directory, aborting parsing process");
    return;
  }

  const files = fs.readdirSync(metadataDir);

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const metadataFile = fs.readFileSync(
      path.join(metadataDir, file),
      "utf8"
    );

    const metadata = JSON.parse(metadataFile);

    metadataList.push(metadata);
  }

  return metadataList;
}

export function metadataDescendingSorter(a, b) {
  if (Number(a.id) < Number(b.id))
    return 1; // `b` comes before `a`
  else if (Number(a.id) > Number(b.id))
    return -1; // `a` comes before `b`
  else // equal
    return 0;
}

export async function minifyHTML(inputFile) {
  const outputFile = await minify(inputFile, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });

  return outputFile;
}

export function minifyCSS(inputFile) {
  // TODO: Implement CSS minification here
  return inputFile;
}
