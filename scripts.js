// ローカルストレージからコメントを読み込んで表示する関数
function loadComments(section) {
    const comments = JSON.parse(localStorage.getItem(section)) || [];
    const commentList = document.getElementById(`${section}-panel`);
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `<strong>${comment.name}:</strong> ${comment.content}`;
        commentList.appendChild(div);
    });
}

// コメントを保存する関数
function saveComment(section, name, content) {
    const comments = JSON.parse(localStorage.getItem(section)) || [];
    comments.push({ name, content });
    localStorage.setItem(section, JSON.stringify(comments));
}

// 各セクションのフォームにイベントリスナーを追加
['history', 'government', 'culture', 'comments'].forEach(section => {
    document.getElementById(`${section}-form`).addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById(`${section}-name`).value;
        const content = document.getElementById(`${section}-comment`).value;
        saveComment(section, name, content);
        document.getElementById(`${section}-name`).value = '';
        document.getElementById(`${section}-comment`).value = '';
        loadComments(section);
    });
});

// 初期化時に各セクションのコメントを読み込む
document.addEventListener('DOMContentLoaded', function() {
    ['history', 'government', 'culture', 'comments'].forEach(section => {
        loadComments(section);
    });
});

