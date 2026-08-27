// const pokemonContainer = document.querySelector("#pokemon")

// const searchInput = document.querySelector("#searchInput")
// const searchButton = document.querySelector("#searchButton")
// const randomButton = document.querySelector("#randomButton")

// randomButton.addEventListener("click", () => {
//     const generateRandomPokemon = Math.floor(Math.random() * 1025) + 1;

//     getPokemon(generateRandomPokemon);
// });

// async function getPokemon(pokemonName) {

//     if(pokemonName === "") {
//         throw new Error(pokemonContainer.textContent = "Enter a pokemon name first bruh, or try to genrate a random pokemon.");
//         return;
//     }
    

//     //const pokemon = searchInput.value
//     const API = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

//         const response = await fetch(API)

//         try{
//             if(!response.ok) {
//                 throw new Error(`pokemon "${searchInput.value}" doesn't exists. (or might be a typo)`);
//             }

//             const pokemon = await response.json()
//             const type = pokemon.types[0].type.name
//             console.log(pokemon)
//             pokemonContainer.innerHTML = `
//             <div class="pokemon-card ${type}">
//                 <h2>${pokemon.name}</h2>
//                 <img src="${pokemon.sprites.front_shiny}" alt = "${pokemon.name}">
//                 <p class="type ${type}">Type: ${pokemon.types[0].type.name}</p>
//                 <div class="stats">
//                     <p >HP: ${pokemon.stats[0].base_stat}</p>
//                     <p>Attack: ${pokemon.stats[1].base_stat}</p>
//                     <p>Defense: ${pokemon.stats[2].base_stat}</p>
//                     <p>Sp. Attack: ${pokemon.stats[3].base_stat}</p>
//                     <p>Sp. Defense: ${pokemon.stats[4].base_stat}</p>
//                     <p>Speed: ${pokemon.stats[5].base_stat}</p>
//                 </div>
//             </div>
//             `

//         }
//         catch(error){
//             console.log(pokemonContainer.textContent = error.message)
//         }
//     }

// searchButton.addEventListener("click", () => {

//     getPokemon(searchInput.value);
// })



const pokemonContainer = document.querySelector("#pokemon");

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const randomButton = document.querySelector("#randomButton");


/* =========================
   GET POKEMON
========================= */

async function getPokemon(pokemonName) {

    if (pokemonName === "") {
        pokemonContainer.innerHTML = `
            <p class="error">
                Enter a Pokémon name first.
            </p>
        `;
        return;
    }

    const API = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Pokémon not found.");
        }

        const pokemon = await response.json();

        console.log(pokemon);

        displayPokemon(pokemon);

    } catch (error) {

        pokemonContainer.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;
    }
}


/* =========================
   DISPLAY POKEMON
========================= */

function displayPokemon(pokemon) {

    const type = pokemon.types[0].type.name;

    const stats = pokemon.stats;

    const statNames = [
        "HP",
        "Attack",
        "Defense",
        "Sp. Attack",
        "Sp. Defense",
        "Speed"
    ];


    pokemonContainer.innerHTML = `
    
        <div class="pokemon-card">

            <div class="pokemon-hero ${type}">

                <span class="pokemon-id">
                    #${String(pokemon.id).padStart(3, "0")}
                </span>

                <h2>${pokemon.name}</h2>

                <div class="pokemon-image-container">

                    <img 
                        src="${pokemon.sprites.other["official-artwork"].front_default}"
                        alt="${pokemon.name}"
                    >

                </div>

                <p class="type">
                    ${type}
                </p>

            </div>


            <div class="stats-section">

                <h3 class="stats-title">
                    Base Stats
                </h3>


                ${stats.map((stat, index) => {

                    const value = stat.base_stat;

                    const percentage = Math.min(
                        (value / 255) * 100,
                        100
                    );

                    return `
                    
                        <div class="stat">

                            <div class="stat-header">

                                <span class="stat-name">
                                    ${statNames[index]}
                                </span>

                                <span class="stat-value">
                                    ${value}
                                </span>

                            </div>


                            <div class="stat-bar">

                                <div
                                    class="stat-fill ${type}"
                                    style="width: ${percentage}%"
                                ></div>

                            </div>

                        </div>
                    
                    `;

                }).join("")}

            </div>

        </div>
    `;
}


/* =========================
   SEARCH BUTTON
========================= */

searchButton.addEventListener("click", () => {

    getPokemon(searchInput.value);

});


/* =========================
   ENTER KEY
========================= */

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        getPokemon(searchInput.value);

    }

});


/* =========================
   RANDOM POKEMON
========================= */

randomButton.addEventListener("click", () => {

    const randomPokemon =
        Math.floor(Math.random() * 1025) + 1;

    getPokemon(randomPokemon);

});
