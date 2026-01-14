const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'games.db');
const db = new Database(dbPath);

console.log('Initializing database...');

db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    image_url TEXT,
    platform TEXT,
    region TEXT,
    price REAL,
    original_price REAL,
    currency TEXT DEFAULT 'EUR',
    cashback REAL,
    likes INTEGER DEFAULT 0,
    discount INTEGER DEFAULT 0
  )
`);

const count = db.prepare('SELECT count(*) as count FROM games').get().count;

if (count === 0) {
    console.log('Seeding database...');
    const insert = db.prepare(`
    INSERT INTO games (title, slug, image_url, platform, region, price, original_price, cashback, likes, discount)
    VALUES (@title, @slug, @image_url, @platform, @region, @price, @original_price, @cashback, @likes, @discount)
  `);

    const games = [
        {
            title: 'Split Fiction EA App Key (PC) GLOBAL',
            slug: 'split-fiction-ea-app-pc-global',
            image_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Split_Fiction_cover_art.jpg/250px-Split_Fiction_cover_art.jpg',
            platform: 'EA App',
            region: 'GLOBAL',
            price: 40.93,
            original_price: 49.99,
            cashback: 4.50,
            likes: 626,
            discount: 18
        },
        {
            title: 'FIFA 23 Origin Key GLOBAL',
            slug: 'fifa-23-origin-global',
            image_url: 'https://upload.wikimedia.org/wikipedia/en/a/a6/FIFA_23_Cover.jpg',
            platform: 'Origin',
            region: 'GLOBAL',
            price: 19.99,
            original_price: 59.99,
            cashback: 1.00,
            likes: 1500,
            discount: 66
        },
        {
            title: 'Red Dead Redemption 2 Rockstar Key GLOBAL',
            slug: 'rdr2-rockstar-global',
            image_url: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
            platform: 'Rockstar',
            region: 'GLOBAL',
            price: 25.50,
            original_price: 59.99,
            cashback: 2.50,
            likes: 2000,
            discount: 58
        }
    ];

    const insertMany = db.transaction((games) => {
        for (const game of games) insert.run(game);
    });

    insertMany(games);
}

module.exports = db;
