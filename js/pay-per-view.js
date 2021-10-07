/* To save on api-calls I only need the poster path and movie title as url parameters. */

const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

if (URL_PARAMS.has("title")) {
    
    setupPurchasePage(URL_PARAMS.get("title"), URL_PARAMS.get("poster_path"));
}

function setupPurchasePage(purchaseTitle, posterPath, purchasePrice = 99) {

    setPosterImage(posterPath, purchaseTitle);
    setPurchaseTitle(purchaseTitle);
    setPurchasePrice(purchasePrice);

    function setPosterImage(url, title) {
        const posterUrl = TMDB_IMG_URL + "p/w500" + url;
        const poster = document.querySelector(".purchase-poster");
        poster.innerHTML = `<img src="${posterUrl}" alt="${title} poster">`;
    }

    function setPurchaseTitle(title) {
        document.querySelector(".movie-title").innerText = title;
    }

    function setPurchasePrice(price) {
        document.querySelector(".movie-price").innerText = price + ",-";
    }
}