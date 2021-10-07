const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);

if (URL_PARAMS.has("movie_id")) {
    fetchMovie(URL_PARAMS.get("movie_id"));
}

async function fetchMovie(movieID) {
    const url = TMDB_URL + "movie/" + movieID + "?api_key=" + TMDB_API_KEY;
    console.log("fetching");
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setupMoviePage(result);
    } catch (err) {
        console.log(err);
    }
}

function setupMoviePage(movie) {

    setPoster(movie.poster_path);

    function setPoster(url) {
        const posterUrl = TMDB_IMG_URL + "p/w500" + url;
        const poster = document.querySelector("#film-poster");
        poster.src = posterUrl;
    }
}
