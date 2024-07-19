const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let comments = {
    history: [],
    government: [],
    culture: [],
    comments: []
};

app.get('/comments/:section', (req, res) => {
    const section = req.params.section;
    res.json(comments[section] || []);
});

app.post('/comments/:section', (req, res) => {
    const section = req.params.section;
    const comment = req.body;
    if (comments[section]) {
        comments[section].push(comment);
        res.status(200).send('Comment added');
    } else {
        res.status(400).send('Invalid section');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
