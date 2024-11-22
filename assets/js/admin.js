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

        addPost(title, category, description, date, author);
        savePosts();
        postForm.reset();
    });

    function addPost(title, category, description, date, author) {
        const postBox = document.createElement('div');
        postBox.classList.add('post-box', category.toLowerCase());

        postBox.innerHTML = `
            <img src="/img/${category.toLowerCase()}.jpg" alt="${category}" class="post-img">
            <h2 class="category">${category}</h2>
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
            const category = postBox.querySelector('.category').textContent;
            const description = postBox.querySelector('.post-description').textContent;
            const date = postBox.querySelector('.post-date').textContent;
            const author = postBox.querySelector('.profile-name').textContent;

            posts.push({ title, category, description, date, author });
        });
        localStorage.setItem('posts', JSON.stringify(posts));
        updateMainPage();  // Actualiza la página principal cuando haya cambios
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            addPost(post.title, post.category, post.description, post.date, post.author);
        });
    }

    function updateMainPage() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const mainPostsContainer = document.querySelector('.post.container');
        
        // Limpia las publicaciones actuales
        mainPostsContainer.innerHTML = '';

        posts.forEach(post => {
            const postBox = document.createElement('div');
            postBox.classList.add('post-box', post.category.toLowerCase());

            postBox.innerHTML = `
                <img src="/img/${post.category.toLowerCase()}.jpg" alt="${post.category}" class="post-img">
                <h2 class="category">${post.category}</h2>
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
    }
});

//Para que el Header se mantenga siempre presente al scrollear
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});