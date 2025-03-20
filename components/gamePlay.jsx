import { useEffect, useState } from "react";
import { fetchPokemonData } from "./fetchImages";

function GamePlay() {
  const [clickedImages, setClickedImages] = useState([]);
  const [pokemonDataArr, setPokemonDataArr] = useState([]);
  const [highestScore, setHighestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const fetchData = async () => {
    const response = await fetchPokemonData();
    setPokemonDataArr(response);
  };

  function shuffleArray(arr) {
    let currentIndex = arr.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleClick(e) {
    if (gameOver) return;

    const clickedImage = e.target.id;

    if (clickedImages.includes(parseFloat(clickedImage)) || clickedImages.length === 10 ) {
      alert("Game Over!");
      setHighestScore(() => score);
      setScore(() => 0);
      setGameOver(() => true);
      return;
    } else {
      setClickedImages((oldArr) => [...oldArr, parseFloat(clickedImage)]);
      setScore(() => score + 1);
      const shuffledArr = shuffleArray([...pokemonDataArr]);
      setPokemonDataArr(shuffledArr);
    }
  }

  function newGame() {
    return location.reload();
  }

  console.log(clickedImages);
  return (
    <div className="gameboard">
      <h1>Memory Card Game!</h1>
      <ul className="pokemonImages">
        {pokemonDataArr.map((pokemon) => (
          <li key={pokemon.id}>
            {/* {pokemon.name}{" "} */}
            <img
              src={pokemon.url}
              alt={pokemon.name}
              onClick={handleClick}
              name={pokemon.name}
              id={pokemon.id}
            />
          </li>
        ))}
      </ul>

      <div className="scoreboard">
        <h1>Current Score: {score}</h1>
        <h1>Highest Score: {highestScore}</h1>
        <button onClick={newGame}>New Game!</button>
      </div>
    </div>
  );
}

export { GamePlay };
