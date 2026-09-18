const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIRS = [process.cwd(), __dirname];
const TMP_WISHES_FILE = path.join('/tmp', 'wishes.json');
const LOCAL_WISHES_FILE = path.join(process.cwd(), 'wishes.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
}

function resolveStaticPath(pathname) {
  if (!pathname || pathname === '/') {
    pathname = '/index.html';
  }
  for (const dir of ROOT_DIRS) {
    try {
      const fullPath = path.normalize(path.join(dir, pathname));
      if (fullPath.startsWith(dir) && fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
          return { fullPath, size: stats.size };
        }
      }
    } catch (e) {}
  }
  return null;
}

let inMemoryWishes = null;

function loadWishes() {
  if (inMemoryWishes && Array.isArray(inMemoryWishes)) {
    return inMemoryWishes;
  }
  try {
    if (fs.existsSync(TMP_WISHES_FILE)) {
      const data = fs.readFileSync(TMP_WISHES_FILE, 'utf8');
      inMemoryWishes = JSON.parse(data);
      if (Array.isArray(inMemoryWishes)) return inMemoryWishes;
    }
  } catch (e) {}

  try {
    if (fs.existsSync(LOCAL_WISHES_FILE)) {
      const data = fs.readFileSync(LOCAL_WISHES_FILE, 'utf8');
      inMemoryWishes = JSON.parse(data);
      if (Array.isArray(inMemoryWishes)) return inMemoryWishes;
    }
  } catch (e) {}

  inMemoryWishes = [];
  return inMemoryWishes;
}

function saveWishes(wishes) {
  inMemoryWishes = wishes;
  try {
    fs.writeFileSync(TMP_WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
  } catch (e) {}
  try {
    fs.writeFileSync(LOCAL_WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf8');
  } catch (e) {}
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. API: Wishes GET
  if (pathname === '/api/wishes' && req.method === 'GET') {
    const data = loadWishes();
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    });
    res.end(JSON.stringify(data));
    return;
  }

  // 2. API: Wishes POST
  if (pathname === '/api/wishes' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const newWish = JSON.parse(body || '{}');
        if (!newWish.id) newWish.id = Date.now();
        if (!newWish.time) newWish.time = 'Baru saja';
        if (!newWish.date) newWish.date = new Date().toISOString();

        const wishes = loadWishes();
        wishes.unshift(newWish);
        saveWishes(wishes);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, wish: newWish }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // 3. API: Ajax Mock & Rest Mock
  if (pathname === '/api/ajax' || pathname.startsWith('/api/rest/')) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: true, message: 'OK' }));
    return;
  }

  // 4. Static Files
  const resolved = resolveStaticPath(pathname);
  if (!resolved) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(resolved.fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': resolved.size,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
  });

  const stream = fs.createReadStream(resolved.fullPath);
  stream.pipe(res);
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

module.exports = server;
