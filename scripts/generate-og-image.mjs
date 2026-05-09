/**
 * Rasterizes scripts/og-social-card.svg → public/og-image.png (1200×630)
 * Run: npm run generate:og
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, "og-social-card.svg");
const outPath = join(__dirname, "..", "public", "og-image.png");

async function main() {
  const svg = readFileSync(svgPath);
  let sharpModule;
  try {
    sharpModule = await import("sharp");
  } catch {
    console.error(
      "Missing dependency: run `npm install` (devDependency sharp is required)."
    );
    process.exit(1);
  }
  const sharp = sharpModule.default ?? sharpModule;
  const png = await sharp(svg).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(outPath, png);
  console.warn("Wrote", outPath, `(${png.length} bytes)`);
}

main();
