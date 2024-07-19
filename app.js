document.addEventListener("DOMContentLoaded", () => {
    // セクションごとのコメントを保持するための変数
    const sections = ["history", "government", "culture", "comments"];
    const serverUrl = "http://localhost:3000";

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

    // コメントをサーバーに保存し、表示する関数
    function addComment(section, name, comment) {
        const commentData = { name, comment };
        fetch(`${serverUrl}/comments/${section}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentData)
        })
        .then(response => {
            if (response.ok) {
                loadComments(section);
            } else {
                console.error("Failed to add comment");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    // サーバーからコメントを読み込み、表示する関数
    function loadComments(section) {
        fetch(`${serverUrl}/comments/${section}`)
        .then(response => response.json())
        .then(comments => {
            displayComments(section, comments);
        })
        .catch(error => {
            console.error("Error:", error);
        });
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
