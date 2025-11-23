function loadMovies(movies) {
    const movieList = document.getElementById("movies_grid");
    const popularMovieList = document.getElementById("popular_movies")
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
    allMovies.forEach(movie => {
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

function searchMovies() {
    let input, filter, cards_container, card, txtValue;

    input = document.getElementById("search_input");
    filter = input.value.toUpperCase();
    cards_container = document.getElementById("movies_grid");
    cards = cards_container.getElementsByClassName("card");
    for(card of cards){
        txtValue = card.querySelector("h1").textContent;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }
}


function filterMovies() {

}

fetch("movies.json")
    .then(res => res.json())
    .then(movies => {
        allMovies = movies;
        loadMovies(movies)
    })
    .catch(error => alert("Movies couldn't load."))

