let nbPokemons = 20;

const div = document.querySelector(".pokemons");
fetch("https://pokeapi.co/api/v2/pokemon?limit=" + nbPokemons)
.then((response) => response.json())
.then((data) => {
    data.forEach(pokemon => {
        console.log(pokemon);
        // div.innerHTML += "<img src='" + data.results + "'"
    });
    
})
.catch((error) => div.innerHTML = error)