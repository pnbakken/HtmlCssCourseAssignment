const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const CONSUMER_KEY = "ck_39f7bcc9a98df0e2297823df0abb2093163baf20";
const CONSUMER_SECRET = "cs_e4cf7ff22535328d4a83476ac03a7de639a100b3";
const SE_API_URL = "https://www.plumtree.no/square-eyes-api/wp-json/wc/v2/products/";
const AUTH_URL = `${SE_API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=50`;
const CORS_FIX = "https://noroffcors.herokuapp.com/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

/* NOT CURRENTLY WORKING
const filterSelect = document.querySelector("#filter-free-films");
console.log(filterSelect);
filterSelect.onchange = (() => {
    console.log("Filter changed");
    if (filterSelect.checked) {
        console.log("checked");
        window.location = `./collection.html?${queryString}&on_sale=true`;
    } else {
        ("not checked");
        
    }
});  */


const RESULT_TABLE = document.querySelector(".result-table");



setupCollectionPage();

function setupCollectionPage() {
    
    pageLoading(RESULT_TABLE);
    let offer;
    if (urlParams.has("on_offer")) {
        offer = urlParams.get("on_offer");
    } else offer = false;
    
    if (urlParams.has("search_term") && urlParams.get("search_term") !== "") {
        getSearchResults(urlParams.get("search_term"), urlParams.get("page"), offer);
    } else if (urlParams.has("page")) {
        getCollection(urlParams.get("page"));
    } else {
        getCollection(AUTH_URL);
    }

}

async function getSquareEyesCollection(url) {
    const response = await fetch(url);
    const result = await response.json();
    displayResults(result, "Collection");
}

async function getCollection(url) {
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        pageReady(RESULT_TABLE);
        //generatePageLinks(result.total_pages, result.page);
        displayResults(result, "Collection");
    } catch (err) {
        console.error(err);
        return null;
    }   
}



async function getSearchResults(searchTerm, pageNumber= 1, onOffer) {
    const URL = AUTH_URL;
    
    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);
        pageReady(RESULT_TABLE);
        // generatePageLinks(result.total_pages, result.page, searchTerm);
        if (!onOffer) {
            displayResults(result.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())), `Results for "${searchTerm}"`);
        } else {
            displayResults(result.filter(item =>item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.on_sale), `Results for "${searchTerm}"`);
        }
        
    } catch (err) {
        console.error(err);
        return null;
    }
    
}


function displayResults(collection, heading) {
    
    setCollectionHeading(heading);
    if (collection.length > 0) {
        for (let movie of collection) {
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
    // And I'm not even currently using it
    let pageLinkHTML = "Page: ";

    for (let i = 1; i <= size; i++) {

        if (inRange(i, currentPage-2, currentPage+2)) {
            if (i === currentPage) {
                if (searchKeyword !== "") {
                    pageLinkHTML += `<a href="./collection.html?page=${i}&search_term=${searchKeyword}" class="active-collection-page">${i}</a>`
                } else {
                    pageLinkHTML += `<a href="./collection.html?page=${i}" class="active-collection-page">${i}</a>`
                }
            } else {
                if (searchKeyword !== "") {
                    pageLinkHTML += `<a href="./collection.html?page=${i}&search_term=${searchKeyword}">${i}</a>`
                } else {
                    pageLinkHTML += `<a href="./collection.html?page=${i}">${i}</a>`
                }
            }
        }
    }
    pageLinkHTML += ` of ${size}`;

    document.querySelector("#links-top").innerHTML = pageLinkHTML;
    document.querySelector("#links-bottom").innerHTML = pageLinkHTML;

    function inRange(x, min, max) {
        return (x >= min && x <= max)
    }
}

function buildCollectionItemHTML(item) {

    let imagePath = getItemPosterImage(item.images);

    return `<div class="collection-item"> 
                <a href="./film-page.html?movie_id=${item.id}">
                    <div><img src="${getItemPosterImage(item.images)}" alt="${item.name}" class="collection-poster"/></div>
                </a>
                <div class"collection-item-details">
                    <p class="item-title collection-title">${item.name}</p>
                    <p>Price: ${getItemPrice(item)} </p>
                </div>
            </div>`;
}

function getItemPosterImage(images) {

    if (images.length > 0) {
        return images[0].src;
    } else return "";
    

}

function getItemPrice(item) {
    if (item.on_sale) {
        return `<span class="movie-price"><span class="sale-price">${item.price},-</span> On Sale!</span>`;
    } else return `<span class="movie-price">${item.price},-</span>`;
}

function pageLoading(container) {
    container.innerHTML = `<div class="loader"></div><p>Loading</p>`;
}

function pageReady(container) {
    container.innerHTML = "";
}

const titleSearchButton = document.querySelector("#title-search-button");
const titleSearchField = document.querySelector("#title-search");
const filterOffer = document.querySelector("#filter-offer")
console.log(filterOffer.checked);
titleSearchField.addEventListener("keyup", (event) => {
    
 if (event.keyCode === 13 && titleSearchField.value.trim()) {
     event.preventDefault();
     if (filterOffer.checked) {
        console.log("offer checked");
         goToSearch(titleSearchField.value.trim().toLowerCase(), true)
     } else {
         goToSearch(titleSearchField.value.trim().toLowerCase());
     }
     
 }
});
titleSearchButton.onclick = (e) => {
    e.preventDefault();
    if (titleSearchField.value.trim()) {
        if (filterOffer.checked) {
            goToSearch(titleSearchField.value.trim().toLowerCase(), true)
        } else {
            
            goToSearch(titleSearchField.value.trim().toLowerCase());
        }
        
    }
}

function goToSearch(search, onOffer=false) {
    if (onOffer) {
        window.location = `./collection.html?search_term=${search}&on_offer=true`;
    } else {
        window.location = `./collection.html?search_term=${search}`;
    }
}