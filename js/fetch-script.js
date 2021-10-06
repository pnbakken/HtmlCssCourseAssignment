const TMDB_API_KEY = "d5b5096de95f26903a3b6601c9a24d4f";
const TMDB_URL = "https://api.themoviedb.org/3/discover/movie/";
const TMDB_IMG_URL = ""
let configData = null;
async function getConfigData() {
    const URL = TMDB_URL + "?api_key=" + TMDB_API_KEY;
    try {
        const response = await fetch(URL);
        const result = await response.json();
        console.log(result);    
    } catch (err) {
        console.error(err);
    }   
}
getConfigData();