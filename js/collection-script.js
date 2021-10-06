const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const COLLECTION = getCollection(); // have this constant/variable to try to perform client side sorting
console.log(COLLECTION);



async function getCollection() {
    const URL = TMDB_URL + "discover/movie/" + "?api_key=" + TMDB_API_KEY;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        displayCollection(result);
    } catch (err) {
        console.error(err);
        return null;
    }   
}

function displayCollection(collection) {
    const resultTable = document.querySelector(".result-table");
    for (let movie of collection.results) {
        resultTable.innerHTML += buildCollectionItemHTML(movie);
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



