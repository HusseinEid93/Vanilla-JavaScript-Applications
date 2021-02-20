const poke_container = document.getElementById('poke-container');
const POKEMONS_NUMBER = 150;
const colors = {
   fire: '#FDDFDF',
   grass: '#DEFDE0',
   electric: '#FCF7DE',
   water: '#DEF3FD',
   ground: '#f4e7da',
   rock: '#d5d5d4',
   fairy: '#fceaff',
   poison: '#98d7a5',
   bug: '#f8d5a3',
   dragon: '#97b3e6',
   psychic: '#eaeda1',
   flying: '#F5F5F5',
   fighting: '#E6E0D4',
   normal: '#F5F5F5'
};




(async () => {
   for (let i = 1; i <= POKEMONS_NUMBER; i++) {
      await getPokemon(i);
   }
})();


async function getPokemon(id) {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   const response = await fetch(url);
   const pokemon = await response.json();
   createPokemonCard(pokemon);
}


function createPokemonCard(pokemon) {
   const pokemonEl = document.createElement('div');
   pokemonEl.classList.add('pokemon');

   // Get the first type 
   const type = pokemon.types[0].type.name;

   const color = colors[type];

   const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

   pokemonEl.style.backgroundColor = color;

   const pokeInnerHTML = `
      <div class='img-container'>
         <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
      </div>
      
      <div class='info'>
         <span class='number'>#${pokemon.id.toString().padStart(3, '0')}</span>
         <h3 class='name'>${name}</h3>
         <div class='type-container'>Type:
            <small class='type'>${type}</small> 
         </div>
      </div>
   `;

   pokemonEl.innerHTML = pokeInnerHTML;
   poke_container.appendChild(pokemonEl);
}


