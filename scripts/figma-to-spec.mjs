import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const cacheDir = path.join(root, "figma-cache");
const filePath = path.join(cacheDir, "file.json");
const outputPath = path.join(cacheDir, "figma-outline.md");

function walk(node, depth = 0, rows = []) {
  if (!node || depth > 4) return rows;

  const type = node.type || "UNKNOWN";
  const name = node.name || "(unnamed)";
  rows.push(`${"  ".repeat(depth)}- ${name} (${type})`);

  for (const child of node.children || []) {
    walk(child, depth + 1, rows);
  }

  return rows;
}

const file = JSON.parse(await readFile(filePath, "utf8"));
const lines = [
  "# Figma File Outline",
  "",
  `File: ${file.name || "Untitled"}`,
  `Last modified: ${file.lastModified || "unknown"}`,
  "",
  "## Top-Level Structure",
  "",
  ...walk(file.document),
  "",
  "## Use",
  "",
  "Use this outline for audit before editing `index.html`.",
];

await writeFile(outputPath, lines.join("\n"));
console.log(`Wrote ${outputPath}`);
