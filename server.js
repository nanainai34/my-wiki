const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let comments = {
    historyComments: [],
    governmentComments: [],
    cultureComments: [],
    generalComments: []
};

app.get('/comments/:section', (req, res) => {
    const section = req.params.section;
    res.json(comments[section] || []);
});

app.post('/comments/:section', (req, res) => {
    const section = req.params.section;
    const { name, comment } = req.body;
    if (comments[section]) {
        comments[section].push({ name, comment });
        res.status(201).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid section' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
