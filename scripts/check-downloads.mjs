#!/usr/bin/env node
/* Build-time safety check: every locally-referenced downloadable asset (and any
   <a download>) must (1) exist on disk and (2) be included in the Vercel
   deployment (i.e. NOT matched by .vercelignore). Prevents a missing/ignored
   file — like the Capability Statement PDF — from silently shipping a broken
   download. Run: node scripts/check-downloads.mjs  (exit 1 on failure). */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const DOWNLOAD_EXT = new Set([".pdf", ".zip", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".csv"]);

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

// Files excluded from the Vercel deployment (matched by .vercelignore).
function isDeployExcluded(relPath) {
  try {
    execFileSync("git", ["check-ignore", "-q", "--no-index",
      // apply .vercelignore patterns via a temp attr file is not available to
      // check-ignore; instead we shell to a tiny python pathspec helper:
    ]);
  } catch { /* not used */ }
  return excluded.has(relPath.replace(/^\.\//, ""));
}

// Precompute the excluded set with pathspec (exact gitignore semantics).
const excluded = new Set(
  JSON.parse(execFileSync("python3", ["-c", `
import pathspec, subprocess, json
pats=[l for l in open('.vercelignore') if l.strip() and not l.startswith('#')]
spec=pathspec.PathSpec.from_lines('gitwildmatch', pats)
files=subprocess.check_output(['git','ls-files']).decode().splitlines()
print(json.dumps([f for f in files if spec.match_file(f)]))
`]).toString())
);

const problems = [];
for (const file of walk(ROOT)) {
  const html = readFileSync(file, "utf8");
  const rel = file.replace(ROOT + "/", "");
  // <a ... download ...> and any local href/src to a downloadable extension
  const anchorRe = /<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi;
  let m;
  while ((m = anchorRe.exec(html))) {
    const tag = m[0], href = m[1];
    const isDownloadAttr = /\bdownload\b/i.test(tag);
    const isDownloadExt = href.startsWith("/") && DOWNLOAD_EXT.has(extname(href.split("?")[0]).toLowerCase());
    if (!isDownloadAttr && !isDownloadExt) continue;
    if (!href.startsWith("/")) continue; // external/relative handled elsewhere
    const target = href.split("?")[0].split("#")[0].replace(/^\//, "");
    if (!existsSync(join(ROOT, target)))
      problems.push(`${rel}: link ${href} -> file missing on disk (${target})`);
    else if (excluded.has(target))
      problems.push(`${rel}: link ${href} -> file is EXCLUDED from deploy by .vercelignore (${target})`);
    if (isDownloadAttr)
      problems.push(`${rel}: <a download> on ${href} — a download attr masks 404s by saving the error page; prefer a plain link to an existing asset.`);
  }
}

if (problems.length) {
  console.error("✗ Download safety check FAILED:\n" + problems.map(p => "  - " + p).join("\n"));
  process.exit(1);
}
console.log("✓ Download safety check passed: all referenced downloadable assets exist and deploy.");
