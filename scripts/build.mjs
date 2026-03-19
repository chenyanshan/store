import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
const DATA_FILE = path.join(ROOT_DIR, "data.js");
const SRC_DIR = path.join(ROOT_DIR, "src");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DIST_DATA_DIR = path.join(DIST_DIR, "data");

const CANONICAL_RESULTS = new Set(["success", "failure", "warning"]);

function parseCasesFromDataJs(source) {
  try {
    const normalizedSource = source
      .replace(/^\s*export\s+default\s+cases\s*;?\s*$/gm, "")
      .replace(/^\s*export\s+const\s+cases\s*=/m, "const cases =")
      .replace(/^\s*export\s+\{[^}]*cases[^}]*\}\s*;?\s*$/gm, "");

    const parsed = Function('"use strict";\n' + normalizedSource + "\nreturn cases;")();
    if (!Array.isArray(parsed)) {
      throw new Error("`cases` is not an array.");
    }
    return parsed;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error("Cannot parse `data.js`: " + reason);
  }
}

function buildMeta(cases) {
  const resultCounts = {
    success: 0,
    failure: 0,
    warning: 0
  };
  const categoryCountsMap = new Map();
  const unknownResults = new Set();

  for (const record of cases) {
    const result = String(record?.result ?? "");
    const category = String(record?.category ?? "未分类");

    if (CANONICAL_RESULTS.has(result)) {
      resultCounts[result] += 1;
    } else {
      unknownResults.add(result || "empty");
    }

    categoryCountsMap.set(category, (categoryCountsMap.get(category) ?? 0) + 1);
  }

  const categoryCounts = Array.from(categoryCountsMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, "zh-CN"));

  return {
    generatedAt: new Date().toISOString(),
    total: cases.length,
    resultCounts,
    categoryCounts,
    unknownResults: Array.from(unknownResults).sort()
  };
}

async function main() {
  const source = await readFile(DATA_FILE, "utf8");
  const cases = parseCasesFromDataJs(source);
  const meta = buildMeta(cases);

  await rm(DIST_DIR, { recursive: true, force: true });
  await mkdir(DIST_DATA_DIR, { recursive: true });
  await cp(SRC_DIR, DIST_DIR, { recursive: true });

  await writeFile(path.join(DIST_DATA_DIR, "cases.json"), JSON.stringify(cases, null, 2) + "\n", "utf8");
  await writeFile(path.join(DIST_DATA_DIR, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");

  console.log(`Built dist with ${cases.length} cases.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
