const newFormHandler = async (event) => {
    event.preventDefault();

    console.log("the blog id --- ", event.target.dataset.blogid)

    const description = document.querySelector('textarea[name="comment-desc"]').value.trim();


    console.log(description);
    if (description) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ description, blog_id: event.target.dataset.blogid }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });


        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete comment');
        }
    }
};

document
    .querySelectorAll('.new-comment-form')
    .forEach(form => {

        form.addEventListener('submit', newFormHandler);
    });

// document
//     .querySelector('.comment-list')
//     .addEventListener('click', delButtonHandler);
