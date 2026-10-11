import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = '0.0.0.0';
const PORT = Number(process.env.SERVER_PORT || process.env.PORT || 4321);
const DIST_DIR = fileURLToPath(new URL('./dist/', import.meta.url));

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  console.error(`Invalid SERVER_PORT/PORT: ${process.env.SERVER_PORT || process.env.PORT}`);
  process.exit(1);
}

if (!existsSync(join(DIST_DIR, 'index.html'))) {
  console.error('Static build is missing. Run `npm run build` or redeploy the server.');
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function safeFilePath(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidate = resolve(DIST_DIR, decoded);
  const root = resolve(DIST_DIR) + sep;
  if (candidate !== resolve(DIST_DIR) && !candidate.startsWith(root)) return null;
  return candidate;
}

function resolveRequestPath(pathname) {
  const candidate = safeFilePath(pathname);
  if (!candidate) return null;

  if (existsSync(candidate)) {
    const stat = statSync(candidate);
    if (stat.isDirectory()) {
      const indexFile = join(candidate, 'index.html');
      if (existsSync(indexFile)) return indexFile;
    } else if (stat.isFile()) {
      return candidate;
    }
  }

  if (!extname(candidate)) {
    const htmlFile = `${candidate}.html`;
    if (existsSync(htmlFile) && statSync(htmlFile).isFile()) return htmlFile;

    const indexFile = join(candidate, 'index.html');
    if (existsSync(indexFile) && statSync(indexFile).isFile()) return indexFile;
  }

  return null;
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if (url.pathname === '/healthz') {
      res.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    const filePath = resolveRequestPath(url.pathname);
    if (!filePath) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=3600';

    res.writeHead(200, {
      'content-type': contentType,
      'cache-control': cacheControl,
      'x-content-type-options': 'nosniff',
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = createReadStream(filePath);
    stream.on('error', (error) => {
      console.error('File stream error:', error);
      if (!res.headersSent) res.writeHead(500);
      res.end();
    });
    stream.pipe(res);
  } catch (error) {
    console.error('Request error:', error);
    if (!res.headersSent) {
      res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
    }
    res.end('Bad Request');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`HT-WEB static server listening on http://${HOST}:${PORT}`);
  console.log(`Health check: http://${HOST}:${PORT}/healthz`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
