let searchField = document.querySelector("#search-field");

searchField.addEventListener("keyup", (event) => {
    console.log("keyup");
 if (event.keyCode === 13 && searchField.value.trim()) {
     console.log("Enter entered");
     event.preventDefault();
     location.href = `../collection.html?search_term=${searchField.value.trim().toLowerCase()}`;
 }
});