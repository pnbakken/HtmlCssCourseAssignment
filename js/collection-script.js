const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const RESULT_TABLE = document.querySelector(".result-table");

setupCollectionPage();

function setupCollectionPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    pageLoading(RESULT_TABLE);
    if (urlParams.has("search_term") && urlParams.get("search_term") !== "") {
        getSearchResults(urlParams.get("search_term"), urlParams.get("page"));
        console.log("Setting up search page");
    } else if (urlParams.has("page")) {
        getCollection(urlParams.get("page"));
    } else {
        getCollection();
    }
    console.log(queryString);

}

async function getCollection(pageNumber = 1) {
    const URL = TMDB_URL + "discover/movie/?api_key=" + TMDB_API_KEY + `&page=${pageNumber}`;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        pageReady(RESULT_TABLE);
        generatePageLinks(result.total_pages, result.page);
        displayResults(result, "Collection");
    } catch (err) {
        console.error(err);
        return null;
    }   
}

async function getSearchResults(searchTerm, pageNumber= 1) {
    const URL = TMDB_URL + "search/movie?api_key=" + TMDB_API_KEY + `&query=${searchTerm}&page=${pageNumber}`;
    
    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        pageReady(RESULT_TABLE);
        generatePageLinks(result.total_pages, result.page, searchTerm);
        displayResults(result, `Results for "${searchTerm}"`);
    } catch (err) {
        console.error(err);
        return null;
    }
    
}

function displayResults(collection, heading) {
    
    setCollectionHeading(heading);
    if (collection.results.length > 0) {
        for (let movie of collection.results) {
            RESULT_TABLE.innerHTML += buildCollectionItemHTML(movie);
        }
    } else {
        RESULT_TABLE.innerHTML = `<p class="no-result">No results found</p>`;
    }
    
}

function setCollectionHeading(heading) {
    document.querySelector(".collection-heading").innerHTML = `<h3>${heading}</h3>`;
}

function generatePageLinks(size, currentPage, searchKeyword = "") {

    // This function has maybe been the most complicated and stupid solution of the whole project so far

    const resultLinks = document.querySelector(".collection-page-links");

    resultLinks.innerHTML = "Page: ";

    for (let i = 1; i <= size; i++) {

        if (inRange(i, currentPage-2, currentPage+2)) {
            if (i === currentPage) {
                if (searchKeyword !== "") {
                    resultLinks.innerHTML += `<a href="./collection.html?page=${i}&search_term=${searchKeyword}" class="active-collection-page">${i}</a>`
                } else {
                    resultLinks.innerHTML += `<a href="./collection.html?page=${i}" class="active-collection-page">${i}</a>`
                }
            } else {
                if (searchKeyword !== "") {
                    resultLinks.innerHTML += `<a href="./collection.html?page=${i}&search_term=${searchKeyword}">${i}</a>`
                } else {
                    resultLinks.innerHTML += `<a href="./collection.html?page=${i}">${i}</a>`
                }
            }
        }
    }

    resultLinks.innerHTML += ` of ${size}`;

    function inRange(x, min, max) {
        return (x >= min && x <= max)
    }
}

function buildCollectionItemHTML(item) {

    let imagePath = getItemPosterImage(item.poster_path);

    return `<div class="collection-item"> 
                <a href="./film-page.html?movie_id=${item.id}">
                    <div><img src="${imagePath}" alt="${item.title} poster" class="collection-poster"/></div>
                </a>
                <p class="item-title">${item.title}</p>
            </div>`;
}

function getItemPosterImage(posterPath) {
    return TMDB_IMG_URL + "p/w500/" + posterPath;

}

function pageLoading(container) {
    container.innerHTML = `<div class="loader"></div><p>Loading</p>`;
}

function pageReady(container) {
    container.innerHTML = "";
}