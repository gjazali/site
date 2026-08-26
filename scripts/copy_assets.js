import fs from "fs";
import path from "path";

export function copyAssets(inputDirPath, outputDirPath) {
  const inputDir = path.resolve(inputDirPath);
  const outputDir = path.resolve(outputDirPath);

  if (!fs.existsSync(inputDir)) {
    console.log("Input directory doesn't exist, skipping copy");
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  fs.cpSync(inputDir, outputDir, {
    recursive: true,
    filter: (source) => path.basename(source) !== ".DS_Store",
  });

  console.log(`Copied ${inputDir} to ${outputDir}`);
}
