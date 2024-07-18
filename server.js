const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const commentsFile = 'comments.json';

// Load comments
const loadComments = () => {
    if (fs.existsSync(commentsFile)) {
        return JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
    }
    return { history: [], government: [], culture: [], general: [] };
};

// Save comments
const saveComments = (comments) => {
    fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
};

// Get comments
app.get('/comments', (req, res) => {
    res.json(loadComments());
});

// Post a comment
app.post('/comments', (req, res) => {
    const comments = loadComments();
    const { section, name, comment } = req.body;
    if (comments[section]) {
        comments[section].push({ name, comment });
        saveComments(comments);
        res.status(200).json({ message: 'Comment added successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid section' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
