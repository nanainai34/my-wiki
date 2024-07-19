const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB接続設定
mongoose.connect('mongodb://localhost/comments-app', { useNewUrlParser: true, useUnifiedTopology: true });

// コメントのスキーマとモデルを定義
const commentSchema = new mongoose.Schema({
    section: String,
    name: String,
    comment: String
});

const Comment = mongoose.model('Comment', commentSchema);

app.use(cors());
app.use(bodyParser.json());

app.get('/comments/:section', async (req, res) => {
    const section = req.params.section;
    const comments = await Comment.find({ section });
    res.json(comments);
});

app.post('/comments/:section', async (req, res) => {
    const section = req.params.section;
    const { name, comment } = req.body;
    if (['historyComments', 'governmentComments', 'cultureComments', 'generalComments'].includes(section)) {
        const newComment = new Comment({ section, name, comment });
        await newComment.save();
        res.status(201).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid section' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
document.addEventListener('DOMContentLoaded', () => {
    loadComments();
});

function loadComments() {
    const sections = ['historyComments', 'governmentComments', 'cultureComments', 'generalComments'];
    sections.forEach(section => {
        fetch(`http://localhost:3000/comments/${section}`)
            .then(response => response.json())
            .then(data => {
                const panel = document.getElementById(`${section.replace('Comments', 'panel')}`);
                data.forEach(comment => {
                    addComment(panel, comment.name, comment.comment);
                });
            });
    });
}

function addComment(panel, name, comment) {
    const commentElement = document.createElement('li');
    commentElement.textContent = `${name}: ${comment}`;
    panel.appendChild(commentElement);
}

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const section = form.id.replace('-form', 'Comments');
        const name = form.querySelector('input[type="text"]').value;
        const comment = form.querySelector('textarea').value;

        fetch(`http://localhost:3000/comments/${section}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, comment })
        }).then(response => {
            if (response.ok) {
                form.reset();
                loadComments(); // コメントを再ロードして表示
            }
        });
    });
});
