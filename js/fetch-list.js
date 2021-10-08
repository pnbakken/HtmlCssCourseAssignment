const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_IMG_URL = "https://image.tmdb.org/t/";

const scroller1 = document.querySelector("#scroller-items-1");
const scroller2 = document.querySelector("#scroller-items-2");
const scroller3 = document.querySelector("#scroller-items-3");

getList("with_genres=18&primary_release_year=2021", scroller1);
getList("with_genres=28", scroller2);
getList("with_genres=27", scroller3)

async function getList(listString, target) {
    const url = TMDB_URL + "discover/movie/?api_key=" + TMDB_API_KEY + "&" + listString;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        generateList(target, result);
    } catch (err) {
        console.error(err);
    }
}

function generateList(target, list) {
    let count = 0;
    target.innerHTML ="";
    for (let item of list.results) {
        if (count === 6) {
            break;
        }
        target.innerHTML += `<div class="index-list-item">
                                <a href="./film-page.html?movie_id=${item.id}">    
                                    <img src="${getPosterUrl(item.poster_path)}" alt="${item.title} poster" />
                                </a>
                            </div>`;
        count++;
    }
}

function getPosterUrl(url) {
    return TMDB_IMG_URL + "p/w500/" + url;
}