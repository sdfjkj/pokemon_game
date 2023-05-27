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

    while (newNumbersSet.size < 6) {
      newNumbersSet.add(generateRandomNumber());
    }

    const newNumbers = [...newNumbersSet];
    async function fetchPokemonData() {
      const response1 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${newNumbers[0]}`
      );
      setMypokemon((mypokemon) => [...mypokemon, response1.data]);
      const response2 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${newNumbers[1]}`
      );
      setMypokemon((mypokemon) => [...mypokemon, response2.data]);
      const response3 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${newNumbers[2]}`
      );
      setMypokemon((mypokemon) => [...mypokemon, response3.data]);
      const response4 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${newNumbers[3]}`
      );
      setCompokemon((compokemon) => [...compokemon, response4.data]);
      const response5 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${newNumbers[4]}`
      );
      setCompokemon((compokemon) => [...compokemon, response5.data]);
      const response6 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${newNumbers[5]}`
      );
      setCompokemon((compokemon) => [...compokemon, response6.data]);
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
