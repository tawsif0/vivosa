import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

async function main() {
  const pdfPath = path.resolve(__dirname, "..", "..", "Jacket-M-W.pdf");
  if (!fs.existsSync(pdfPath)) {
    // eslint-disable-next-line no-console
    console.error("Missing PDF:", pdfPath);
    process.exit(1);
  }

  const cmapsDir = path.resolve(__dirname, "..", "node_modules", "pdfjs-dist", "cmaps");
  const stdFontsDir = path.resolve(
    __dirname,
    "..",
    "node_modules",
    "pdfjs-dist",
    "standard_fonts",
  );

  const cMapUrl = ensureTrailingSlash(pathToFileURL(cmapsDir).href);
  const standardFontDataUrl = ensureTrailingSlash(pathToFileURL(stdFontsDir).href);

  const outDir = path.resolve(__dirname, "..", "tmp", "jacket-m-w");
  fs.mkdirSync(outDir, { recursive: true });

  const loadingTask = pdfjsLib.getDocument({
    url: pathToFileURL(pdfPath).href,
    cMapUrl,
    cMapPacked: true,
    standardFontDataUrl,
    useSystemFonts: true,
    disableFontFace: true,
    // Node: keep it simple and deterministic
    disableWorker: true,
  });

  const pdf = await loadingTask.promise;

  // eslint-disable-next-line no-console
  console.log("Pages:", pdf.numPages);

  const scale = 2.0;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });

    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const ctx = canvas.getContext("2d");

    await page.render({ canvasContext: ctx, viewport }).promise;

    const outPath = path.join(outDir, `page-${String(pageNumber).padStart(2, "0")}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer("image/png"));
    // eslint-disable-next-line no-console
    console.log(outPath);
  }
}

main();

