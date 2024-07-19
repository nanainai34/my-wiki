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

// コメントをサーバーから読み込む関数
function loadComments() {
    const sections = ['historyComments', 'governmentComments', 'cultureComments', 'generalComments'];
    sections.forEach(section => {
        fetch(`http://localhost:3000/comments/${section}`)
            .then(response => response.json())
            .then(data => {
                const panel = document.getElementById(`${section.replace('Comments', 'panel')}`);
                panel.innerHTML = ''; // 既存のコメントをクリア
                data.forEach(comment => addComment(panel, comment.name, comment.comment));
            })
            .catch(error => console.error('コメントの読み込みに失敗しました:', error));
    });
}

// コメントをサーバーに保存する関数
function saveComment(section, name, comment) {
    return fetch(`http://localhost:3000/comments/${section}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, comment })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Comment saved');
            loadComments(); // コメントを再ロードして表示
        } else {
            console.error('Error saving comment');
        }
    })
    .catch(error => console.error('コメントの保存に失敗しました:', error));
}

// 各フォームのサブミットイベントを処理
function setupForm(form, panelId, section) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value;
        const comment = form.querySelector('textarea').value;
        addComment(document.getElementById(panelId), name, comment);
        saveComment(section, name, comment).then(() => {
            form.reset(); // フォームをリセット
        });
    });
}

setupForm(historyForm, 'history-panel', 'historyComments');
setupForm(governmentForm, 'government-panel', 'governmentComments');
setupForm(cultureForm, 'culture-panel', 'cultureComments');
setupForm(commentsForm, 'comments-panel', 'generalComments');

// ページが読み込まれたときにコメントを読み込む
window.addEventListener('load', loadComments);
