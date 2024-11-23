document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');

    loadPosts();

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value; 
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const author = document.getElementById('author').value;
        const image = document.getElementById('image').files[0];

        const reader = new FileReader();
        reader.onloadend = function() {
            const imageUrl = reader.result;
            addPost(title, category, description, date, author, imageUrl);
            savePosts();
            postForm.reset();
        };
        if (image) {
            reader.readAsDataURL(image);
        }
    });

    function addPost(title, category, description, date, author, imageUrl) {
        const postBox = document.createElement('div');
        postBox.classList.add('post-box', category);

        postBox.innerHTML = `
            <img src="${imageUrl}" alt="${category}" class="post-img">
            <h2 class="category">${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <a href="#" class="post-title">${title}</a>
            <span class="post-date">${date}</span>
            <p class="post-description">${description}</p>
            <div class="profile">
                <img src="/img/autor.jpg" alt="Author" class="profile-img">
                <span class="profile-name">${author}</span>
            </div>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
        `;

        postsContainer.appendChild(postBox);

        postBox.querySelector('.delete-btn').addEventListener('click', () => {
            postsContainer.removeChild(postBox);
            savePosts();
            updateMainPage();
        });

        postBox.querySelector('.edit-btn').addEventListener('click', () => {
            document.getElementById('title').value = title;
            document.getElementById('category').value = category;
            document.getElementById('description').value = description;
            document.getElementById('date').value = date;
            document.getElementById('author').value = author;

            postsContainer.removeChild(postBox);
            savePosts();
            updateMainPage();
        });
    }

    function savePosts() {
        const posts = [];
        postsContainer.querySelectorAll('.post-box').forEach(postBox => {
            const title = postBox.querySelector('a').textContent;
            const category = postBox.querySelector('.category').textContent.toLowerCase();
            const description = postBox.querySelector('.post-description').textContent;
            const date = postBox.querySelector('.post-date').textContent;
            const author = postBox.querySelector('.profile-name').textContent;
            const imageUrl = postBox.querySelector('.post-img').src;

            posts.push({ title, category, description, date, author, imageUrl });
        });
        localStorage.setItem('posts', JSON.stringify(posts));
        updateMainPage();
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            addPost(post.title, post.category, post.description, post.date, post.author, post.imageUrl);
        });
    }

    function updateMainPage() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const mainPostsContainer = document.querySelector('.post.container');

        mainPostsContainer.innerHTML = '';

        posts.forEach(post => {
            const postBox = document.createElement('div');
            postBox.classList.add('post-box', post.category);

            postBox.innerHTML = `
                <img src="${post.imageUrl}" alt="${post.category}" class="post-img">
                <h2 class="category">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</h2>
                <a href="#" class="post-title">${post.title}</a>
                <span class="post-date">${post.date}</span>
                <p class="post-description">${post.description}</p>
                <div class="profile">
                    <img src="/img/autor.jpg" alt="Author" class="profile-img">
                    <span class="profile-name">${post.author}</span>
                </div>
            `;
            mainPostsContainer.appendChild(postBox);
        });

        applyFilter();
    }

    function applyFilter() {
        const activeFilter = document.querySelector(".active-filter").getAttribute("data-filter");
        if (activeFilter === "all") {
            document.querySelectorAll(".post-box").forEach(postBox => postBox.style.display = 'block');
        } else {
            document.querySelectorAll(".post-box").forEach(postBox => {
                if (postBox.classList.contains(activeFilter)) {
                    postBox.style.display = 'block';
                } else {
                    postBox.style.display = 'none';
                }
            });
        }
    }
});
