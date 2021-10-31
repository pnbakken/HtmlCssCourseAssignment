

const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const TMDB_IMG_URL = "https://image.tmdb.org/t/";
const PAYMENT_INFO = document.querySelector("#payment-info");
const CARD_NUMBER = document.querySelector("#card-number");
const CVC_CODE = document.querySelector("#cvcode");
const MESSAGE_BOX = document.querySelector("#purchase-message");
const AUTH_URL = "https://www.plumtree.no/square-eyes-api/wp-json/wc/store/products/";

if (URL_PARAMS.has("movie_id")) {
    
    setupPurchasePage(URL_PARAMS.get("movie_id"));
}

PAYMENT_INFO.onsubmit = (event) => {
    event.preventDefault();
    if (validatePurchaseInfo(CARD_NUMBER.value, CVC_CODE.value)) {
        completeSale(URL_PARAMS.get("movie_id"));
    } 
};

async function setupPurchasePage(id) {

    const url = AUTH_URL + id;

    try {
        const response = await fetch(url);
        const result = await response.json();
        
        buildPage(result);
        
    } catch (err) {
        console.error(err);
    }

    function buildPage(movie) {
        function setPosterImage(url, title) {
            const posterUrl = url;
            const poster = document.querySelector(".purchase-poster");
            poster.innerHTML = `<img src="${posterUrl}" alt="${title}">`;
        }

        function setPurchaseTitle(title) {
            document.querySelector(".movie-title").innerHTML = `<p>${title}</p>`;
        }

        function setPurchasePrice(movie) {
            const target = document.querySelector(".movie-price");

            if (movie.on_sale) {
                target.innerHTML = `<span class="sale-price">${movie.prices.price},-</span>`;
            } else {
                target.innerHTML = `${movie.prices.price},-`;
            }
        }

        setPosterImage(movie.images[0].src, movie.name);
        setPurchaseTitle(movie.name);
        setPurchasePrice(movie);
    }

    /*
    

    

    

    
    */
}



function validatePurchaseInfo(cardNumber, cvc) {


    const cardRegex = /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/;
    const cvcRegex = /^[0-9]{3,4}$/;
    let valid = true;
    MESSAGE_BOX.innerHTML = "";
    if (!cardRegex.test(cardNumber)) {
        CARD_NUMBER.classList.add("invalid");
        MESSAGE_BOX.innerHTML += `<p class="error">Card number seems to be invalid. (Use any combination of 16 digits eg. 0000 0000 0000 0000)</p>`;
        valid = false;
    } else {
        CARD_NUMBER.classList.remove("invalid");
    }
    if (!cvcRegex.test(cvc)) {
        CVC_CODE.classList.add("invalid");
        MESSAGE_BOX.innerHTML += `<p class="error">Please enter a valid CVC</p>`;
        valid = false;
    } else {
        CVC_CODE.classList.remove("invalid");
    } 

    return valid;
}

function completeSale(id) {
    MESSAGE_BOX.innerHTML = `<div class="purchase-success"><p>Purchase completed!</p>
                             </div>`;
    window.location = `../my-purchases.html?new_purchase=${id}`;
}