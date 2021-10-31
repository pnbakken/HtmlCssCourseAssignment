const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const STORAGE = window.sessionStorage;

const CONSUMER_KEY = "ck_49557c160b917df745facc3de8a4a411a5a5e9d8";
const CONSUMER_SECRET = "cs_a43e0349bb857aafd68cb9ad721755e647ca7430";
const SE_API_URL = "https://www.plumtree.no/square-eyes-api/wp-json/wc/v2/products/";
const AUTH_URL = `${SE_API_URL}/?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=50`;


/* I understand that adding movie purchases via a url query like this 
   isn't a good idea, but it's handy for testing */

if (urlParams.has("new_purchase")) {
    
    addToCollection(urlParams.get("new_purchase"));
}

getCollectionFromStorage();

function getCollectionFromStorage() {
    const COLLECTION = STORAGE.getItem("owned_movies").split(",");
    if(COLLECTION) {
        getCollectionFromAPI(COLLECTION);
    }
}

async function getCollectionFromAPI(movies) {
    const response = await fetch(AUTH_URL);
    const result = await response.json();

    let returnedCollection = result.filter( (movie) => {
        for (let id of movies) {
            if (parseInt(movie.id) === parseInt(id)) {
                return true;
            }
        }
    });
    
    buildCollectionDisplay(returnedCollection);
}

function buildCollectionDisplay(movies) {
    movies.forEach((movie) => {
        document.querySelector(".result-table").innerHTML += `<div class="collection-item">
                                                                <a href="./film-page.html?movie_id=${movie.id}">
                                                                    <img src="${movie.images[0].src}" class="collection-poster"/>
                                                                </a>
                                                                <p>${movie.name}</p>
                                                              </div>`;
    });
}

function addToCollection(id) {
    let ownedMovies = [];
    if (STORAGE.getItem("owned_movies")) {
        ownedMovies = STORAGE.getItem("owned_movies").split(",");
        STORAGE.clear();

        if (isNewMovie(ownedMovies, id)) {
            ownedMovies.unshift(parseInt(id));
        }
        
    } else {
        ownedMovies.unshift(parseInt(id));
    }
    STORAGE.setItem("owned_movies", ownedMovies);

    function isNewMovie(movieArray, sign) {
        let isNew = true;
        
        movieArray.forEach( (movie) => {
            if (parseInt(movie) === parseInt(sign)) {
                isNew = false;
            }
        })
        return isNew;
    }


}

