const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const SE_API_URL = "https://www.plumtree.no/square-eyes-api/wp-json/wc/store/products";

const genres = {
    drama : 17,
    action : 19,
    comedy : 21,
    horror : 22,
}

const scroller1 = document.querySelector("#scroller-items-1");
const scroller2 = document.querySelector("#scroller-items-2");
const scroller3 = document.querySelector("#scroller-items-3");
const scroller4 = document.querySelector("#scroller-items-4");

getLists();

async function getLists() {
    const url = SE_API_URL; 
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);

        const actionMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.action));
        const dramaMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.drama));
        const horrorMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.horror));
        const comedyMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.comedy));
        generateList(scroller1, dramaMatches);
        generateList(scroller2, actionMatches);
        generateList(scroller3, horrorMatches);
        generateList(scroller4, comedyMatches);
    } catch (err) {
        console.error(err);
    }
}

function matchAnyCriteria(item, criteria, sign) {
    switch (criteria) {
        case "categories" :
            if (item.categories) {
                return matchCategory(item, sign);
            } else return false;  
    } 
    return false;
}

function matchCategory(item, sign) {
    for (let crit of item.categories) {
        console.log( crit + " === " + sign);
        if (crit.id === sign) {
            return true;
        }
    }
}

function generateList(target, list) {
    let count = 0;
    target.innerHTML ="";
    for (let item of list) {
        if (count === 6) {
            break;
        }
        target.innerHTML += `<div class="index-list-item">
                                <a href="./film-page.html?movie_id=${item.id}">    
                                    <img src="${item.images[0].src}" alt="${item.name} poster" />
                                </a>
                                <p class"list-item-title">${item.name}</p>
                            </div>`;
        count++;
    }
}

