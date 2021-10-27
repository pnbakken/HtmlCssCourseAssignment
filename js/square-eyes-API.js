const url = "http://square-eyes-api.local/wp-json/wc/store/products";

const RESULT_TABLE = document.querySelector(".result-table");

async function getFromAPI(url) {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    displayResults(result);
}

getFromAPI(url);

function displayResults(collection, heading) {
    
    
    if (collection.length > 0) {
        for (let movie of collection) {
            RESULT_TABLE.innerHTML += buildCollectionItemHTML(movie);
        }
    } else {
        RESULT_TABLE.innerHTML = `<p class="no-result">No results found</p>`;
    }
    
}

function buildCollectionItemHTML(item) {

   

    return `<div class="collection-item"> 
                <a href="./film-page.html?movie_id=${item.id}">
                    <div><img src="" alt="${item.name} poster" class="collection-poster"/></div>
                </a>
                <div class"collection-itemq-details">
                    <p class="item-title collection-title">${item.name}</p>
                    <p>Rating: <span class="item-rating">0</p>
                </div>
            </div>`;
}
