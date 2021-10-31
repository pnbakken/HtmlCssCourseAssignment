let searchField = document.querySelector("#search-field");

searchField.addEventListener("keyup", (event) => {
    
 if (event.keyCode === 13 && searchField.value.trim()) {
     
     event.preventDefault();
     location.href = `./collection.html?search_term=${searchField.value.trim().toLowerCase()}`;
 }
});

const searchButton = document.querySelector("#search-button");
searchButton.onclick = () => {
    if (searchField.value !== "") {
        searchButton.href += "?search_term=" + searchField.value.trim().toLowerCase();
    }
}