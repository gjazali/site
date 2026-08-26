import fs from "fs";
import path from "path";

export function cleanOutputDir(outputDirPath) {
  const outputDir = path.resolve(outputDirPath);

  if (!fs.existsSync(outputDir)) {
    console.log("Output directory doesn't exist, skipping clean");
    return;
  }

  fs.rmSync(outputDir, { recursive: true, force: true });

  console.log(`Cleaned ${outputDir}`);
}
