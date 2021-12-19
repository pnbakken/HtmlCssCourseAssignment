let searchField = document.querySelector("#search-field");

searchField.addEventListener("keyup", (event) => {
    
 if (event.keyCode === 13 && searchField.value.trim()) {
     
     event.preventDefault();
     location.href = `./collection.html?search_term=${searchField.value.trim().toLowerCase()}`;
 }
});

const searchButton = document.querySelector("#search-button");
console.log(searchButton);
searchButton.onclick = () => {
    console.log("clicked");
    if (searchField.value !== "") {
        window.location = "./collection.html?search_term=" + searchField.value.trim().toLowerCase();
    }
}