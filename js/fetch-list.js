const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const SE_API_URL = "https://www.plumtree.no/square-eyes-api/wp-json/wc/store/products";

const genres = {
    drama : "17",
    action : "19",
    comedy : "21",
    horror : "22",
}

const scroller1 = document.querySelector("#scroller-items-1");
const scroller2 = document.querySelector("#scroller-items-2");
const scroller3 = document.querySelector("#scroller-items-3");

getList("categories", genres.drama, scroller1);
getList("categories", genres.action, scroller2);
getList("categories", genres.horror, scroller3)

async function getList(criteria, sign, target) {
    const url = SE_API_URL; 
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        const criteriaMatches = result.filter( (item) => matchAnyCriteria(item, criteria, sign));
        console.log(criteriaMatches);
        generateList(target, criteriaMatches);
    } catch (err) {
        console.error(err);
    }
}

function matchAnyCriteria(item, criteria, sign) {
    if (item[criteria]) {
        for (let crit of item[criteria]) {
            console.log( crit + " === " + sign);
            if (crit.id == sign) {
                return true;
            }
        }
    } else return false;
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
                            </div>`;
        count++;
    }
}

