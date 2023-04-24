// Define constants for API key and Movie Database base URL
const API_KEY = "a7fe84011d201ece1739765158833a11";
const MOVIE_DB_BASE_URL = "https://api.themoviedb.org/3";

// Function to search for movies based on a query
const searchMovies = (searchQuery) => {
  // Encode the search query
  const encodedQuery = encodeURIComponent(searchQuery);

  // Construct the search URL using the API key and encoded query
  const searchURL = `${MOVIE_DB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}`;

  // Fetch data from the API, parse the JSON, and display the results
  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => displayMovies(data.results))
    .catch((error) => console.error(error));
};

// Function to display a list of movies
const displayMovies = (movies) => {
  // Get the movie container element
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = "";

  // Loop through the movies and create cards for each movie
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
};

// Add event listener to the search button
document.getElementById("search-button").addEventListener("click", () => {
  searchMovies(document.getElementById("search-input").value);
});

// Add mouseover event listener to the movie container to show the movie overview
document
  .getElementById("movie-container")
  .addEventListener("mouseover", (event) => {
    if (event.target.closest(".movie-card")) {
      event.target
        .closest(".movie-card")
        .querySelector(".movie-overview").style.display = "block";
    }
  });

// Add mouseout event to hide the movie overview
document
  .getElementById("movie-container")
  .addEventListener("mouseout", (event) => {
    if (event.target.closest(".movie-card")) {
      event.target
        .closest(".movie-card")
        .querySelector(".movie-overview").style.display = "none";
    }
  });

// Function to fetch top-rated movies
function fetchTopRatedMovies() {
  // Construct the top-rated movies URL using the API key
  const topRatedURL = `${MOVIE_DB_BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
  
  // Fetch data from the API, parse the JSON, and display the results
  fetch(topRatedURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      return displayMovies(data.results);
    })
    .catch((error) => console.error(error));
}

// Fetch and display top-rated movies on initial page load
fetchTopRatedMovies();