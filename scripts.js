document.addEventListener("DOMContentLoaded", function() {
    // Load comments from the server
    function loadComments() {
        fetch('/comments')
            .then(response => response.json())
            .then(data => {
                displayComments('history-panel', data.history);
                displayComments('government-panel', data.government);
                displayComments('culture-panel', data.culture);
                displayComments('comment-list', data.general);
            });
    }

    // Display comments in the specified panel
    function displayComments(panelId, comments) {
        const panel = document.getElementById(panelId);
        panel.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.className = "comment";
            commentElement.innerHTML = `<strong>${comment.name}</strong><p>${comment.comment}</p>`;
            panel.appendChild(commentElement);
        });
    }

    // Handle form submissions
    function handleFormSubmit(event, section) {
        event.preventDefault();
        const form = event.target;
        const name = form.querySelector('input[type="text"]').value;
        const comment = form.querySelector('textarea').value;
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ section, name, comment }),
        })
        .then(response => response.json())
        .then(data => {
            loadComments();
            form.reset();
        })
        .catch(error => console.error('Error:', error));
    }

    document.getElementById("history-form").addEventListener("submit", function(event) {
        handleFormSubmit(event, 'history');
    });

    document.getElementById("government-form").addEventListener("submit", function(event) {
        handleFormSubmit(event, 'government');
    });

    document.getElementById("culture-form").addEventListener("submit", function(event) {
        handleFormSubmit(event, 'culture');
    });

    document.getElementById("comment-form").addEventListener("submit", function(event) {
        handleFormSubmit(event, 'general');
    });

    loadComments();
});
function displayFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileContent = event.target.result;
            const fileContentDiv = document.getElementById('fileContent');
            fileContentDiv.innerText = fileContent;
        };

        reader.readAsText(file);
    } else {
        alert("No file selected");
    }
}
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

