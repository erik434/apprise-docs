/* Basic linter for all Apprise Docs */
import fs from "node:fs";
import path from "node:path";
import { parseDocument } from "yaml";

const ALLOWED_KEYS = new Set([
  // Common Starlight keys used
  "title",
  "description",
  "sidebar",
  "tableOfContents",
  "draft",
  "editUrl",
  "prev",
  "next",

  // custom keys
  "has_attachments",
  "has_image",
  "has_sms",
  "has_selfhosted",
  "schemas",
  "sample_urls",
  "source",
  "group",
  "limits",
  "ended",
]);

const ROOT = process.cwd();

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      out.push(...walk(p));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function extractFrontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return null;
  return text.slice(4, end + 1);
}

let failed = false;

for (const file of walk(ROOT)) {
  const text = fs.readFileSync(file, "utf8");
  const fm = extractFrontmatter(text);
  if (!fm) continue;

  const doc = parseDocument(fm);
  const data = doc.toJS();

  if (!data || typeof data !== "object" || Array.isArray(data)) continue;

  for (const key of Object.keys(data)) {
    if (!ALLOWED_KEYS.has(key)) {
      failed = true;
      console.error(
        `[frontmatter] ${path.relative(ROOT, file)}: unsupported key "${key}"`
      );
    }
  }
}

if (failed) process.exit(2);
