const burgerBtn = document.querySelector('.burger_btn');
const mobileNav = document.querySelector('.mobile_nav');

burgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

// optional: close menu when user clicks a link
mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mobileNav.classList.remove('open');
    }
});




function loadMovies(movies) {
    const movieList = document.getElementById("movies_grid");
    const popularMovieList = document.getElementById("popular_movies")
    movies.forEach(movie => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
        <img src="${movie.image_url}" alt="${movie.name}" class="movie_img">
        <div class="card_content">
            <h1 class="movie_name">${movie.name}</h1>
            <p class="movie_year">${movie.year}</p>
        </div>`;
        movieList.appendChild(card);
    });
    movies.forEach(movie => {
        const popularMovieCard = document.createElement("div");
        popularMovieCard.className = "popular_movie_card";
        popularMovieCard.innerHTML = `
        <img src="${movie.image_url}" alt="${movie.name}" class="popular_movie_img">
        <div class="popular_card_content">
            <h1 class="popular_movie_name">${movie.name}</h1>
            <p class="popular_movie_year">${movie.year}</p>
        </div>`;
        popularMovieList.appendChild(popularMovieCard);
    });
}

fetch("movies.json")
    .then(res => res.json())
    .then(movies => {
        loadMovies(movies)
    })
    .catch(error => alert("Movies couldn't load."))

