// app.js

// コメントのフォームとパネルを取得
const historyForm = document.getElementById('history-form');
const historyPanel = document.getElementById('history-panel');
const governmentForm = document.getElementById('government-form');
const governmentPanel = document.getElementById('government-panel');
const cultureForm = document.getElementById('culture-form');
const culturePanel = document.getElementById('culture-panel');
const commentsForm = document.getElementById('comments-form');
const commentsPanel = document.getElementById('comments-panel');

// コメントを追加する関数
function addComment(panel, name, comment) {
    const li = document.createElement('li');
    li.textContent = `${name}: ${comment}`;
    panel.appendChild(li);
}

// 各フォームのサブミットイベントを処理
historyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('history-name').value;
    const comment = document.getElementById('history-comment').value;
    addComment(historyPanel, name, comment);
    historyForm.reset(); // フォームをリセット
});

governmentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('government-name').value;
    const comment = document.getElementById('government-comment').value;
    addComment(governmentPanel, name, comment);
    governmentForm.reset(); // フォームをリセット
});

cultureForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('culture-name').value;
    const comment = document.getElementById('culture-comment').value;
    addComment(culturePanel, name, comment);
    cultureForm.reset(); // フォームをリセット
});

commentsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('comments-name').value;
    const comment = document.getElementById('comments-comment').value;
    addComment(commentsPanel, name, comment);
    commentsForm.reset(); // フォームをリセット
});
