const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// SQLiteデータベースのセットアップ
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE comments (name TEXT, content TEXT)");
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/comments', (req, res) => {
    db.all("SELECT rowid AS id, name, content FROM comments", (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.post('/comments', (req, res) => {
    const { name, content } = req.body;
    db.run("INSERT INTO comments (name, content) VALUES (?, ?)", [name, content], function (err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
