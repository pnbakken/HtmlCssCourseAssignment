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

    setTitle(movie.title);
    setPoster(movie.poster_path);
    setReleaseYear(movie.release_date);
    setOverview(movie.overview);
    setRating(movie.vote_average, movie.vote_count);
    setTagline(movie.tagline);

    function setPoster(url) {
        const posterUrl = TMDB_IMG_URL + "p/w500" + url;
        const poster = document.querySelector("#film-poster");
        poster.src = posterUrl;
    }

    function setTitle(title) {
        document.querySelector("title").innerText += title;
        document.querySelector("#fact-box-title").innerText = title;
    }

    function setReleaseYear(releaseDate) {

        const year = extractYear(releaseDate);
        document.querySelector("#year").innerText = year;
        
        function extractYear(date) {
            const dates = date.split("-");
            return dates[0];
        }
    }

    function setOverview(overview) {
        document.querySelector("#movie-overview").innerHTML = `<p>${overview}</p>`;
    }

    function setRating(rating, likes) {
        document.querySelector("#rating").innerText = `Rating: ${rating}`;
        document.querySelector("#users-liked").innerText = `Liked by ${likes} users`;
    }

    function setTagline(tagline) {
        document.querySelector("#movie-tagline").innerHTML = `<span class="tagline">${tagline}</span>`;
    }
}





function pageLoading(container) {
    container.innerHTML = `<div class="loader"></div><p>Loading</p>`;
}

function pageReady(container) {
    container.innerHTML = "";
}