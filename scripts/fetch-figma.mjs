import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const envPath = path.join(root, ".env.local");
const cacheDir = path.join(root, "figma-cache");

function parseEnv(text) {
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const index = line.indexOf("=");
        return index === -1 ? [line, ""] : [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}

async function loadEnv() {
  const fileEnv = existsSync(envPath) ? parseEnv(await readFile(envPath, "utf8")) : {};
  return { ...fileEnv, ...process.env };
}

async function figmaGet(endpoint, token) {
  const response = await fetch(`https://api.figma.com/v1${endpoint}`, {
    headers: { "X-Figma-Token": token },
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Figma API ${response.status}: ${text}`);
  }

  return JSON.parse(text);
}

function safeNodeId(nodeId) {
  return nodeId.replace(/[^a-zA-Z0-9_-]+/g, "-");
}

async function main() {
  const env = await loadEnv();
  const token = env.FIGMA_TOKEN;
  const fileKey = env.FIGMA_FILE_KEY;
  const nodeId = env.FIGMA_NODE_ID;

  if (!token || token.includes("replace_with")) {
    throw new Error("Missing FIGMA_TOKEN. Create .env.local from .env.example and add a new token.");
  }
  if (!fileKey) {
    throw new Error("Missing FIGMA_FILE_KEY.");
  }

  await mkdir(cacheDir, { recursive: true });

  const file = await figmaGet(`/files/${fileKey}`, token);
  await writeFile(path.join(cacheDir, "file.json"), JSON.stringify(file, null, 2));

  let node = null;
  let image = null;
  if (nodeId) {
    node = await figmaGet(`/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`, token);
    await writeFile(path.join(cacheDir, `node-${safeNodeId(nodeId)}.json`), JSON.stringify(node, null, 2));

    image = await figmaGet(`/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=png&scale=1`, token);
    await writeFile(path.join(cacheDir, `image-${safeNodeId(nodeId)}.json`), JSON.stringify(image, null, 2));
  }

  const summary = [
    "# Figma Fetch Summary",
    "",
    `- File: ${file.name || fileKey}`,
    `- Last modified: ${file.lastModified || "unknown"}`,
    `- Version: ${file.version || "unknown"}`,
    `- Node: ${nodeId || "not set"}`,
    `- Cached file JSON: figma-cache/file.json`,
    nodeId ? `- Cached node JSON: figma-cache/node-${safeNodeId(nodeId)}.json` : "",
    nodeId ? `- Image export URL JSON: figma-cache/image-${safeNodeId(nodeId)}.json` : "",
    "",
    "Note: this script reads Figma data only. It does not edit the Figma canvas.",
  ].filter(Boolean).join("\n");

  await writeFile(path.join(cacheDir, "summary.md"), summary);
  console.log(summary);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
