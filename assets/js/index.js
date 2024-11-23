$(document).ready(function () {
  loadPosts();

  $(".filter-item").click(function () {
      const value = $(this).attr("data-filter");
      if (value === "all") {
          $(".post-box").show("1000");
      } else {
          $(".post-box").not("." + value).hide("1000");
          $(".post-box").filter("." + value).show("1000");
      }
  });

  $(".filter-item").click(function () {
      $(this).addClass("active-filter").siblings().removeClass("active-filter");
  });

  function loadPosts() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.forEach((post) => {
          const postBox = createPostBox(
              post.title,
              post.category,
              post.description,
              post.date,
              post.author,
              post.imageUrl // Aquí pasamos la URL de la imagen
          );
          $(".post").append(postBox);
      });
      applyFilter(); // Aplicar filtro después de cargar los posts
  }

  function createPostBox(title, category, description, date, author, imageUrl) {
      return `
          <div class="post-box ${category}">
              <img src="${imageUrl}" alt="${category}" class="post-img"> <!-- Mostrar la imagen -->
              <h2 class="category">${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <a href="#" class="post-title">${title}</a>
              <span class="post-date">${date}</span>
              <p class="post-description">${description}</p>
              <div class="profile">
                  <span class="profile-name">${author}</span>
              </div>
          </div>
      `;
  }

  function applyFilter() {
      const activeFilter = $(".active-filter").attr("data-filter");
      if (activeFilter === "all") {
          $(".post-box").show("1000");
      } else {
          $(".post-box").not("." + activeFilter).hide("1000");
          $(".post-box").filter("." + activeFilter).show("1000");
      }
  }
});
