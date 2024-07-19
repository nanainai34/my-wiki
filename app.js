document.addEventListener("DOMContentLoaded", () => {
    // セクションごとのコメントを保持するための変数
    const sections = ["history", "government", "culture", "comments"];

    // 各セクションのコメントを読み込み、表示する
    sections.forEach(section => {
        loadComments(section);
    });

    // 各セクションのフォームにイベントリスナーを追加
    sections.forEach(section => {
        const form = document.getElementById(`${section}-form`);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = form.querySelector(`input[name="${section}-name"]`).value;
            const comment = form.querySelector(`textarea[name="${section}-comment"]`).value;
            addComment(section, name, comment);
            form.reset();
        });
    });

    // コメントをローカルストレージに保存し、表示する関数
    function addComment(section, name, comment) {
        const comments = JSON.parse(localStorage.getItem(section)) || [];
        comments.push({ name, comment });
        localStorage.setItem(section, JSON.stringify(comments));
        displayComments(section, comments);
    }

    // ローカルストレージからコメントを読み込み、表示する関数
    function loadComments(section) {
        const comments = JSON.parse(localStorage.getItem(section)) || [];
        displayComments(section, comments);
    }

    // コメントを表示する関数
    function displayComments(section, comments) {
        const panel = document.getElementById(`${section}-panel`);
        panel.innerHTML = "";
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `<strong>${comment.name}</strong><p>${comment.comment}</p>`;
            panel.appendChild(commentElement);
        });
    }
});
