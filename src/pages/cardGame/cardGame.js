import React, { useState } from "react";
import axios from "axios";
import "./cardGame.css";

export const CardGame = () => {
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };
  const [mypokemon, setMypokemon] = useState([]);
  const [selectedpokemon, setselectedpokemon] = useState([]);
  const handlePokemonSelect = (pokemon) => {
    if (selectedpokemon.length < 2) {
      setselectedpokemon((prevSelectedPokemon) => [
        ...prevSelectedPokemon,
        pokemon,
      ]);
    } else {
      alert("두마리 까지여");
    }
  };

  const Cards = (pokemon) => {
    return (
      <div
        className="pokemon_container"
        onClick={() => handlePokemonSelect(pokemon)}
      >
        {pokemon && (
          <div className="pokemon_box">
            <img
              src={pokemon.sprites.front_shiny}
              alt="pokemon"
              className="poke_img"
            />
            <div className="pokemon_name">{pokemon.forms[0].name}</div>
            <div className="pokemon_stat_attack">
              attack :{" "}
              {
                pokemon.stats.find((stat) => stat.stat.name === "attack")
                  .base_stat
              }
            </div>
          </div>
        )}
      </div>
    );
  };

  // const battle = (pokemon1, pokemon2) => {};
  const game_setting = () => {
    setselectedpokemon([]);
    setMypokemon([]);

    const newNumbersSet = new Set();
    while (newNumbersSet.size < 10) {
      newNumbersSet.add(generateRandomNumber());
    }

    const newNumbers = [...newNumbersSet];

    async function fetchPokemonData() {
      for (let i = 0; i < 10; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
        );

        setMypokemon((mypokemon) => [...mypokemon, response.data]);
      }
    }
    fetchPokemonData();
  };
  return (
    <div className="main_page">
      <div className="game_container">
        <button onClick={game_setting} className="start_button">
          Choose My Pokemon
        </button>
        <div className="card_container">
          {mypokemon && mypokemon.map((el) => <Cards {...el} />)}
        </div>
        <div className="selected_pokemon_zone">
          <div className="selected_pokemon_name">Selected Pokemon</div>
          <div className="selected_pokemon_container">
            {selectedpokemon && selectedpokemon.map((el) => <Cards {...el} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
