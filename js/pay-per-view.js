/* To save on api-calls I only need the poster path and movie title as url parameters. */

const QUERY_STRING = window.location.search;
const URL_PARAMS = new URLSearchParams(QUERY_STRING);
const TMDB_IMG_URL = "https://image.tmdb.org/t/";
const PAYMENT_INFO = document.querySelector("#payment-info");
const CARD_NUMBER = document.querySelector("#card-number");
const VALID_CODE = document.querySelector("#valid-code");
const MESSAGE_BOX = document.querySelector("#purchase-message");

if (URL_PARAMS.has("title")) {
    
    setupPurchasePage(URL_PARAMS.get("title"), URL_PARAMS.get("poster_path"));
}

PAYMENT_INFO.onsubmit = (event) => {
    event.preventDefault();
    if (validatePurchaseInfo(CARD_NUMBER.value, VALID_CODE.value)) {
        completeSale(VALID_CODE.value);
    } 
};

function setupPurchasePage(purchaseTitle, posterPath, purchasePrice = 99) {

    setPosterImage(posterPath, purchaseTitle);
    setPurchaseTitle(purchaseTitle);
    setPurchasePrice(purchasePrice);

    function setPosterImage(url, title) {
        const posterUrl = TMDB_IMG_URL + "p/w500" + url;
        const poster = document.querySelector(".purchase-poster");
        poster.innerHTML = `<img src="${posterUrl}" alt="${title} poster">`;
    }

    function setPurchaseTitle(title) {
        document.querySelector(".movie-title").innerText = title;
    }

    function setPurchasePrice(price) {
        document.querySelector(".movie-price").innerText = price + ",-";
    }
}



function validatePurchaseInfo(cardNumber, validCode) {


    const cardRegex = /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/;
    let valid = true;
    MESSAGE_BOX.innerHTML = "";
    if (!cardRegex.test(cardNumber)) {
        CARD_NUMBER.classList.add("invalid");
        MESSAGE_BOX.innerHTML += `<p class="error">Card number seems to be invalid. (Use any combination of 16 digits eg. 0000 0000 0000 0000)</p>`;
        valid = false;
    } else {
        CARD_NUMBER.classList.remove("invalid");
    }

    if (!validCode) {
        VALID_CODE.classList.add("invalid");
        MESSAGE_BOX.innerHTML += `<p class="error">Please give me a nice compliment</p>`;
        valid = false;
    } else {
        VALID_CODE.classList.remove("invalid");
    }

    return valid;
}

function completeSale(message) {
    MESSAGE_BOX.innerHTML = `<div class="purchase-success"><p>Purchase completed!</p>
                                                           <p>${message} too!</p>
                             </div>`;
}