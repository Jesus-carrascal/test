import React, { useState, useEffect } from "react";
import "./Data.css";

const Data = () => {
  const [generations, setGenerations] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/generation")
      .then((response) => response.json())
      .then((data) => setGenerations(data.results));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => setPokemonData(data));
  };

  return (
    <div>
      <h1>Generaciones de Pokémon</h1>
      <ul>
        {generations.map((generation) => (
          <li key={generation.name}>{generation.name}</li>
        ))}
      </ul>

      <h2>Búsqueda de Pokémon</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Peso: {pokemonData.weight}</p>
          <p>Altura: {pokemonData.height}</p>
        </div>
      )}
    </div>
  );
};

export default Data;
