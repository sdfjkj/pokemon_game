import React, { useState } from "react";
import axios from "axios";
import "./cardGame.css";
export const CardGame = () => {
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };
  const [mypokemon, setMypokemon] = useState([]);
  const [compokemon, setCompokemon] = useState([]);
  const Cards = (pokemon) => {
    return (
      <div>
        {pokemon && (
          <div>
            <img
              src={pokemon.sprites.front_shiny}
              alt="pokemon"
              className="poke_img"
              style={{ width: "200px" }}
            />
            <h3>name : {pokemon.forms[0].name}</h3>
            <h3>
              attack :{" "}
              {
                pokemon.stats.find((stat) => stat.stat.name === "attack")
                  .base_stat
              }
            </h3>
            <h3>
              defense :{" "}
              {
                pokemon.stats.find((stat) => stat.stat.name === "defense")
                  .base_stat
              }
            </h3>
            <button>공격표시</button>
            <button>수비표시</button>
          </div>
        )}
      </div>
    );
  };

  const battle = (pokemon1, pokemon2) => {};
  const game_setting = () => {
    setCompokemon([]);
    setMypokemon([]);

    const newNumbersSet = new Set();

    // modify this to generate 10 unique numbers
    while (newNumbersSet.size < 10) {
      newNumbersSet.add(generateRandomNumber());
    }

    const newNumbers = [...newNumbersSet];

    async function fetchPokemonData() {
      // modify this to fetch data for 10 different Pokemon
      for (let i = 0; i < 10; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
        );

        // assign the first 5 to the user, the rest to the computer
        if (i < 5) {
          setMypokemon((mypokemon) => [...mypokemon, response.data]);
        } else {
          setCompokemon((compokemon) => [...compokemon, response.data]);
        }
      }
    }

    fetchPokemonData();
  };
  return (
    <div className="main_page">
      <div className="game_container">
        <button onClick={game_setting} className="start_button">
          Draw
        </button>
        <div className="card_container">
          <div className="comCard">
            {compokemon && compokemon.map((el) => <Cards {...el} onClick="" />)}
          </div>

          <div className="myCard">
            {mypokemon && mypokemon.map((el) => <Cards {...el} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
