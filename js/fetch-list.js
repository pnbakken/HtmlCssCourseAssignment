const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const CONSUMER_KEY = "ck_49557c160b917df745facc3de8a4a411a5a5e9d8";
const CONSUMER_SECRET = "cs_a43e0349bb857aafd68cb9ad721755e647ca7430";
const SE_API_URL = "https://www.plumtree.no/square-eyes-api/wp-json/wc/v3/products";
const AUTH_URL = `${SE_API_URL}/?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=50`;
const genres = {
    drama : 17,
    action : 19,
    sciFi : 20,
    comedy : 21,
    horror : 22,
    tragedy : 23,
    war : 24,
    thriller : 25,
    romance : 26,    
}

const scroller1 = document.querySelector("#scroller-items-1");
const scroller2 = document.querySelector("#scroller-items-2");
const scroller3 = document.querySelector("#scroller-items-3");
const scroller4 = document.querySelector("#scroller-items-4");
const scroller5 = document.querySelector("#scroller-items-5");

getLists();

async function getLists() {
    const url = AUTH_URL; 
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);

        const actionMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.action));
        const dramaMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.drama));
        const horrorMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.horror));
        const comedyMatches = result.filter( (item) => matchAnyCriteria(item, "categories", genres.comedy));
        const saleMatches = result.filter( (item) => matchAnyCriteria(item, "on_sale", true));
        generateList(scroller1, dramaMatches);
        generateList(scroller2, actionMatches);
        generateList(scroller3, horrorMatches);
        generateList(scroller4, comedyMatches);
        generateList(scroller5, saleMatches);
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

        case "on_sale" :
            return (item.on_sale === sign);
        
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
                                <p class"movie-price">${priceIfOnSale(item)}
                            </div>`;
        count++;
    }

    function priceIfOnSale(movie) {
        if (movie.on_sale) {
            return `<span class="sale-price">${movie.price},-</span> On Sale`;
        } else return movie.price + ",-";
    }
}

