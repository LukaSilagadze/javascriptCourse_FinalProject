fetch("movies.json")
.then(res => {
    if(!res.ok){
        throw new Error("There was a network problem.");
    }
    return res.json();
})
.then(movies => {
    movies.forEach(movie => {
        console.log(movie.name);
    });

    const movieList = document.getElementById("movies_grid");

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
    })
})