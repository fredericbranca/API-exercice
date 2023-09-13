// Ajout du titre
const body = document.querySelector("body");
const h1 = document.createElement("h1");
h1.textContent = "API Pokemon";

// Défini une couleur pour chaque type (j'ai récupéré les types sur Insomnia avec l'url  https://pokeapi.co/api/v2/type et j'ai demandé à chatGPT de me faire une palette de couleur en fonction des types avec une opacité de 50%)
const typeColors = {
    normal: "rgba(168, 168, 120, 0.5)",
    fighting: "rgba(192, 48, 40, 0.5)",
    flying: "rgba(168, 144, 240, 0.5)",
    poison: "rgba(160, 64, 160, 0.5)",
    ground: "rgba(224, 192, 104, 0.5)",
    rock: "rgba(184, 160, 56, 0.5)",
    bug: "rgba(168, 184, 32, 0.5)",
    ghost: "rgba(112, 88, 152, 0.5)",
    steel: "rgba(184, 184, 208, 0.5)",
    fire: "rgba(240, 128, 48, 0.5)",
    water: "rgba(104, 144, 240, 0.5)",
    grass: "rgba(120, 200, 80, 0.5)",
    electric: "rgba(248, 208, 48, 0.5)",
    psychic: "rgba(248, 88, 136, 0.5)",
    ice: "rgba(152, 216, 216, 0.5)",
    dragon: "rgba(112, 56, 248, 0.5)",
    dark: "rgba(112, 88, 72, 0.5)",
    fairy: "rgba(238, 153, 172, 0.5)",
    unknown: "rgba(104, 160, 144, 0.5)", 
    shadow: "rgba(48, 48, 48, 0.5)"
};

// Création de la balise <div class="pokemonsDiv"></div> où les pokemons seront affichés
const pokemonsDiv = document.createElement("div");
pokemonsDiv.classList.add("pokemons");

body.prepend(pokemonsDiv); // Insère cette balise au début de body avec prepend()
body.prepend(h1);

let nbPokemons = 102; // Défini le nombre de pokemons à afficher

// Requête API pour obtenir la liste des pokemons
fetch("https://pokeapi.co/api/v2/pokemon?limit=" + nbPokemons)
.then(response => response.json()) // Convertit la requête en JSON
.then(pokemons => {
    pokemons.results.forEach(pokemon => {
        // console.log(pokemon);

        let pokemonDiv = document.createElement("div");  // Nouvelle div pour chaque pokémon
        pokemonDiv.classList.add("pokemon"); // Ajoute la class pokemon
        pokemonsDiv.appendChild(pokemonDiv);  // Ajoute cette div à la div parent

        // Nouvelle requête API sur l'URL donné pour obtenir des infos spécifiques sur le pokemon
        fetch(pokemon.url)
        .then(response => response.json())
        .then(pokemonInfos => {
            // console.log(pokemonInfos);

            // Récupère l'ID, l'enregistre avec un # devant et complète la chaîne avec des 0 jusqu'à 3 caractères max avec padStart()
            // Convertit l'id:integer en string pour pouvoir utiliser padStart() (sinon erreur)
            let pokemonID = "<p>#" + pokemonInfos.id.toString().padStart(3, '0') + "</p>";

            // Récupère le nom du pokemon
            // charAt(0) renvoie le caractère à la position 0 et toUpperCase() le met en majuscule
            // slice() renvoie la chaîne de caractère à partir de la position 1
            let pokemonName = "<p><b>" + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + "</b></p>"; 

            // Récupère le type du pokemon
            pokemonType = pokemonInfos.types[0].type.name;

            // Ajoute le background color en fonction du type
            let bgColor = typeColors[pokemonType];
            console.log(bgColor);
            if (bgColor) {
                pokemonDiv.style.backgroundColor = bgColor;
                pokemonDiv.style.border = "1px solid " + bgColor;
            }

            // On combine le tout et l'ajoute à la div
            pokemonDiv.innerHTML += pokemonID + pokemonName + pokemonType;

            // Récupère l'image du pokemon et on l'ajoute à la div pokemon
            let img = document.createElement("img"); // création balise img
            img.src = pokemonInfos.sprites.front_default; // >sprites>font_default contient le lien de l'image qu'on recherche
            pokemonDiv.appendChild(img);
        })
    });
    
})
.catch((error) => div.innerHTML = error)