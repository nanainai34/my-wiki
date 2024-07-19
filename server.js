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

// コメント取得
app.get('/comments/:section', async (req, res) => {
    try {
        const section = req.params.section;
        const comments = await Comment.find({ section });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'サーバーエラー' });
    }
});

// コメント投稿
app.post('/comments/:section', async (req, res) => {
    try {
        const section = req.params.section;
        const { name, comment } = req.body;
        if (['historyComments', 'governmentComments', 'cultureComments', 'generalComments'].includes(section)) {
            const newComment = new Comment({ section, name, comment });
            await newComment.save();
            res.status(201).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: '無効なセクション' });
        }
    } catch (err) {
        res.status(500).json({ error: 'サーバーエラー' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
