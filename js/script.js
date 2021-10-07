let searchField = document.querySelector("#search-field");

searchField.addEventListener("keyup", (event) => {
    console.log("keyup");
 if (event.keyCode === 13 && searchField.value.trim()) {
     console.log("Enter entered");
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