const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const SE_API_URL = "https://www.plumtree.no/square-eyes-api/wp-json/wc/store/products";

const messageBox = document.querySelector("#message-box");

if (URL_PARAMS.has("movie_id")) {
    fetchMovie(SE_API_URL, URL_PARAMS.get("movie_id"));
} else {
    fetchMovie(179111) // movie page is no longer accessible without query string, but setting a default movie just in case anyway. Don't know which movie 25 is, just a random number.
}

async function fetchMovie(url, movieID) {
    
    try {
        const response = await fetch(url + `/${movieID}`);
        const result = await response.json();
        console.log(result);
        // for (let item of result) {
        //     console.log(item.id + " === " + movieID);
        //     if (item.id == movieID) {
        //         setupMoviePage(item);
        //     }
        // }

        //let movie = result.filter(item => item.id == movieID);
        setupMoviePage(result);

    } catch (err) {
        console.log(err);
        messageBox.innerHTML = `<p class="error">Oh dear, something went wrong. Please reload the page, or return to the previous page and try again</p>`;
    }
}

function setupMoviePage(movie) {
    console.log(movie);

    setTitle(movie.name);
    setPoster(movie.images);
    setBackdrop(movie.backdrop_path, movie.name);
    //setReleaseYear(movie.release_date);
    setOverview(movie.description);
    setRating(movie.average_rating, movie.vote_count);
    setTagline(movie.short_description);
    setTicketLink(movie.id);
    setPrice(movie);

    function setPoster(images) {
        const poster = document.querySelector("#film-poster");
        if (images.length > 0) {
            poster.src = images[0].src;
        }

    }

    function setBackdrop(url, title) {
        const backdropUrl = TMDB_IMG_URL + "t/p/original" + url;
        const backdrop = document.querySelector("#movie-backdrop");
        backdrop.src = backdropUrl;
        backdrop.alt = `Backdrop for ${title}`;
    }

    function setTitle(title) {
        document.querySelector("title").innerText += title;
        document.querySelector(".item-title").innerText = title;
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
        document.querySelector("#movie-tagline").innerHTML = `<span id="tagline">${tagline}</span>`;
    }

    function setTicketLink(id) {
        document.querySelector("#film-ticket").href += `?movie_id=${id}`;
    }

    function setPrice(movie) {
        if (movie.on_sale) {
            document.querySelector(".movie-price").innerHTML = `<span class="sale-price">${movie.prices.price},-</span> On Sale!`;
        } else {
            document.querySelector(".movie-price").innerText = `${movie.prices.price},-`;
        }
    }
}





function pageLoading(container) {
    container.innerHTML = `<div class="loader"></div><p>Loading</p>`;
}

function pageReady(container) {
    container.innerHTML = "";
}