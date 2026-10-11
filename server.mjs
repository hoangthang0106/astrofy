import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "0.0.0.0";
const PORT = Number(process.env.SERVER_PORT || process.env.PORT || 4321);
const DIST = fileURLToPath(new URL("./dist/", import.meta.url));
const ROOT = resolve(DIST);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  console.error("Invalid SERVER_PORT/PORT:", process.env.SERVER_PORT || process.env.PORT);
  process.exit(1);
}

if (!existsSync(join(ROOT, "index.html"))) {
  console.error("dist/index.html not found. The Astro build did not complete.");
  process.exit(1);
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function resolveFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }

  const relative = normalize(decoded).replace(/^([/\\])+/, "");
  const candidate = resolve(ROOT, relative);
  const rootPrefix = ROOT.endsWith(sep) ? ROOT : ROOT + sep;

  if (candidate !== ROOT && !candidate.startsWith(rootPrefix)) return null;

  const options = [
    candidate,
    candidate + ".html",
    join(candidate, "index.html")
  ];

  for (const file of options) {
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const method = req.method || "GET";
  if (method !== "GET" && method !== "HEAD") {
    res.writeHead(405, { "content-type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }

  const url = new URL(req.url || "/", "http://localhost");

  if (url.pathname === "/healthz") {
    res.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const file = resolveFile(url.pathname);
  if (!file) {
    const notFound = join(ROOT, "404.html");
    if (existsSync(notFound)) {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      if (method === "HEAD") return res.end();
      createReadStream(notFound).pipe(res);
      return;
    }

    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
    return;
  }

  const type = mime[extname(file).toLowerCase()] || "application/octet-stream";
  const cache = extname(file).toLowerCase() === ".html" ? "no-cache" : "public, max-age=3600";

  res.writeHead(200, {
    "content-type": type,
    "cache-control": cache,
    "x-content-type-options": "nosniff"
  });

  if (method === "HEAD") {
    res.end();
    return;
  }

  const stream = createReadStream(file);
  stream.on("error", (error) => {
    console.error("File read error:", error);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  });
  stream.pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`HT-WEB ready on http://${HOST}:${PORT}`);
  console.log(`Health check: /healthz`);
});

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
