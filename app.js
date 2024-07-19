document.addEventListener("DOMContentLoaded", () => {
    const sections = ["history", "government", "culture", "comments"];
    const serverUrl = "http://localhost:3000";

    sections.forEach(section => {
        loadComments(section);
    });

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
