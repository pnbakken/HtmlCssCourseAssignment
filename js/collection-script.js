const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const COLLECTION = getCollection(); // have this constant/variable to try to perform client side sorting
console.log(COLLECTION);

async function getCollection(pageNumber = 1) {
    const URL = TMDB_URL + "discover/movie/" + "?api_key=" + TMDB_API_KEY + `&page=${pageNumber}`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        displayResults(result);
    } catch (err) {
        console.error(err);
        return null;
    }   
}

function displayResults(collection) {
    const resultTable = document.querySelector(".result-table");

    generatePageLinks(collection.total_pages, collection.page);

    for (let movie of collection.results) {
        resultTable.innerHTML += buildCollectionItemHTML(movie);
    }
}

function generatePageLinks(size, currentPage) {
    const resultLinks = document.querySelector(".collection-page-links");
    console.log("generating links");
    console.log(resultLinks);

    for (let i = 1; i <= size; i++) {
        if (isBetween(i, currentPage-3, currentPage+3)) {
            resultLinks.innerHTML += `<a href="./collection.html?page=${i}">${i}</a>`;
            console.log("In range");
        }
    }

    function isBetween(x, min, max) {
        return (x >= min && x <= max)
    }
}

function buildCollectionItemHTML(item) {

    let imagePath = getItemPosterImage(item.poster_path);

    return `<div class="collection-item">
                <a href="./film-page.html?id=${item.id}">
                    <img src="${imagePath}" alt="${item.title} poster" class="collection-poster"/>
                </a>
                <p class="item-title">${item.title}</p>
                <p>
            </div>`;
}



function getItemPosterImage(posterPath) {
    return TMDB_IMG_URL + "p/w500/" + posterPath;

}

function generateBreadCrumbLinks() {

}