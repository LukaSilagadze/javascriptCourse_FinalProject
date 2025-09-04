// Header scroll effect for both index.html and movies.html
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 80) {
        header.classList.add('fixed-header');
    } else {
        header.classList.remove('fixed-header');
    }
});

function renderMovies(movies) {
    const movieList = document.getElementById("movies_grid");
    const popularMovieList = document.getElementById("popular_movies");
    movieList.innerHTML = "";
    popularMovieList.innerHTML = "";
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


let allMovies = [];

fetch("movies.json")
.then(res => {
    if (!res.ok) {
        throw new Error("There was a network problem.");
    }
    return res.json();
})
.then(movies => {
    allMovies = movies;
    renderMovies(allMovies);

    document.getElementById("apply-filters").addEventListener("click", function() {
        // Get selected genres
        const checkedGenres = Array.from(document.querySelectorAll('.genre-filter:checked')).map(cb => cb.value);
        // Get selected year from the first year select (sort by year)
        const yearSelects = document.querySelectorAll('.movie_year_filter');
        let selectedYear = "all";
        let sortType = "Popular";
        if (yearSelects.length > 0) {
            selectedYear = yearSelects[0].value;
            if (yearSelects.length > 1) {
                sortType = yearSelects[1].value;
            }
        }

        let filtered = allMovies;
        // Filter by genre
        if (checkedGenres.length > 0) {
            filtered = filtered.filter(movie => checkedGenres.includes(movie.genre));
        }
        // Filter by year
        if (selectedYear !== "all") {
            filtered = filtered.filter(movie => String(movie.year) === selectedYear);
        }
        // Sort
        if (sortType === "Newest") {
            filtered = filtered.slice().sort((a, b) => b.year - a.year);
        } else if (sortType === "Oldest") {
            filtered = filtered.slice().sort((a, b) => a.year - b.year);
        } // Popular: no sort, or you can implement popularity if you have data

        renderMovies(filtered);
    });
});

