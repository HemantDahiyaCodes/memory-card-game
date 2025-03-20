async function fetchPokemonData() {
  const pokemonDataArray = []; // Store images objects

  while(pokemonDataArray.length < 10) {
    const randomDex = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomDex}`
    );
    const pokemonInfo = await response.json();

    if(!pokemonDataArray.some((pokemon) => pokemon.id === randomDex)) {
      pokemonDataArray.push({
        id: randomDex,
        name: pokemonInfo?.name,
        url: pokemonInfo?.sprites?.front_default,
      });
    }
  }

  return pokemonDataArray;
}

export { fetchPokemonData };
