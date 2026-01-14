const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/list', (req, res) => {
    const { search } = req.query;

    try {
        let query = 'SELECT * FROM games';
        let params = [];

        if (search) {
            query += ' WHERE title LIKE ?';
            params.push(`%${search}%`);
        }

        const stmt = db.prepare(query);
        const games = stmt.all(...params);

        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
