const API_KEY = "a7fe84011d201ece1739765158833a11";
const MOVIE_DB_BASE_URL = "https://api.themoviedb.org/3";

function searchMovies(searchQuery) {
  const encodedQuery = encodeURIComponent(searchQuery);

  const searchURL = `${MOVIE_DB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}`;

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => displayMovies(data.results))
    .catch((error) => console.error(error));
}
function displayMovies(movies) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const movieOverview = document.createElement("div");
    movieOverview.className = "movie-overview";
    movieOverview.textContent = movie.overview;

    movieCard.appendChild(movieTitle);
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieOverview);
    movieContainer.appendChild(movieCard);
  });
}

document.getElementById("search-button").addEventListener("click", () => {
  searchMovies(document.getElementById("search-input").value);
});

document
  .getElementById("search-input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchMovies(event.target.value);
    }
  });
document
  .getElementById("movie-container")
  .addEventListener("mouseover", (event) => {
    if (event.target.closest(".movie-card")) {
      event.target
        .closest(".movie-card")
        .querySelector(".movie-overview").style.display = "block";
    }
  });

document
  .getElementById("movie-container")
  .addEventListener("mouseout", (event) => {
    if (event.target.closest(".movie-card")) {
      event.target
        .closest(".movie-card")
        .querySelector(".movie-overview").style.display = "none";
    }
  });

function fetchTopRatedMovies() {
  const topRatedURL = `${MOVIE_DB_BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
  fetch(topRatedURL)
    .then((response) => response.json())
    .then((data) => displayMovies(data.results))
    .catch((error) => console.error(error));
}
fetchTopRatedMovies();
