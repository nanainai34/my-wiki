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

