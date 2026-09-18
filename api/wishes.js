const fs = require('fs');
const path = require('path');

const TMP_FILE = path.join('/tmp', 'wishes.json');
const ROOT_FILE = path.join(process.cwd(), 'wishes.json');

let inMemoryWishes = null;

function getWishes() {
  if (inMemoryWishes && Array.isArray(inMemoryWishes)) {
    return inMemoryWishes;
  }
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, 'utf8');
      inMemoryWishes = JSON.parse(data);
      if (Array.isArray(inMemoryWishes)) return inMemoryWishes;
    }
  } catch (e) {}

  try {
    if (fs.existsSync(ROOT_FILE)) {
      const data = fs.readFileSync(ROOT_FILE, 'utf8');
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
    fs.writeFileSync(TMP_FILE, JSON.stringify(wishes, null, 2), 'utf8');
  } catch (e) {}
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    const list = getWishes();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.status(200).json(list);
    return;
  }

  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body || '{}');
      }
      const newWish = body || {};

      if (!newWish.id) newWish.id = Date.now();
      if (!newWish.time) newWish.time = 'Baru saja';
      if (!newWish.date) newWish.date = new Date().toISOString();

      const wishes = getWishes();
      wishes.unshift(newWish);
      saveWishes(wishes);

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.status(200).json({ success: true, wish: newWish });
    } catch (err) {
      res.status(400).json({ error: 'Invalid JSON body' });
    }
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};
