$(document).ready(function() {
    // Mostrar publicaciones cuando se carga la página
    loadPosts();

    $('.filter-item').click(function() {
        const value = $(this).attr('data-filter');
        if (value === 'all') {
            $('.post-box').show('1000');
        } else {
            $('.post-box').not('.' + value).hide('1000');
            $('.post-box').filter('.' + value).show('1000');
        }
    });

    $('.filter-item').click(function() {
        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
    
    // Función para cargar las publicaciones desde localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            const postBox = createPostBox(post.title, post.category, post.description, post.date, post.author);
            $('.post').append(postBox);
        });
    }

    // Función para crear un bloque de publicación
    function createPostBox(title, category, description, date, author) {
        return `
            <div class="post-box ${category.toLowerCase()}">
                <h2 class="category">${category}</h2>
                <a href="#" class="post-title">${title}</a>
                <span class="post-date">${date}</span>
                <p class="post-description">${description}</p>
                <div class="profile">
                    <span class="profile-name">${author}</span>
                </div>
            </div>
        `;
    }
});

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});
