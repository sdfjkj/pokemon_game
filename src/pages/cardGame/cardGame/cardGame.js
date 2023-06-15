import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cardGame.css";

import { useNavigate } from "react-router-dom";

export const CardGame = () => {
  const [mypokemon, setMypokemon] = useState([]);
  const [selectedpokemon, setselectedpokemon] = useState([]);
  const [message, setMessage] = useState("포켓몬을 세 마리 선택하세요.");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedpokemon.length >= 3) {
      setMessage("선택 완료");
    } else {
      setMessage("포켓몬을 세 마리 선택하세요.");
    }
  }, [selectedpokemon]);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };

  const handlePokemonSelect = (pokemon) => {
    const alreadySelected = selectedpokemon.some(
      (selected) => selected.id === pokemon.id
    );

    if (alreadySelected) {
      setselectedpokemon((prevSelectedPokemon) =>
        prevSelectedPokemon.filter((p) => p.id !== pokemon.id)
      );
    } else if (selectedpokemon.length < 3) {
      setselectedpokemon((prevSelectedPokemon) => [
        ...prevSelectedPokemon,
        pokemon,
      ]);
    } else {
      setMessage(
        "이미 세 개를 선택하셨습니다. 선택을 취소하려면 포켓몬을 다시 누르세요."
      );
    }
  };

  const Cards = (pokemon) => {
    const isSelected = selectedpokemon.some(
      (selected) => selected.id === pokemon.id
    );
    const img_list = [
      "front_default",
      "front_shiny",
      "front_female",
      "front_shiny_female",
    ];
    const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);

    return (
      <div
        className={`pokemon_container ${isSelected ? "selected" : ""}`}
        onClick={() => handlePokemonSelect(pokemon)}
      >
        {pokemon && (
          <div className="pokemon_box">
            <img
              src={pokemon.sprites[imgSrc]}
              alt="pokemon"
              className="poke_img"
            />
            <div className="pokemon_name">{pokemon.forms[0].name}</div>
            <div className="pokemon_stat_attack">
              attack :
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

  const game_setting = () => {
    setselectedpokemon([]);
    setMypokemon([]);

    const newNumbersSet = new Set();
    while (newNumbersSet.size < 8) {
      newNumbersSet.add(generateRandomNumber());
    }

    const newNumbers = [...newNumbersSet];

    async function fetchPokemonData() {
      for (let i = 0; i < 8; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
        );

        setMypokemon((mypokemon) => [...mypokemon, response.data]);
      }
    }
    fetchPokemonData();
  };

  return (
    <div className="game_page">
      <div className="game_container">
        <div className="start_button_container">
          <button onClick={game_setting} className="start_button">
            Choose My Pokemon
          </button>
        </div>
        <div className="card_container">
          {mypokemon && mypokemon.map((el) => <Cards {...el} />)}
        </div>
        <div className="game_state_container">
          <div className="selected_pokemon_zone">
            <div className="selected_pokemon_name">Selected Pokemon</div>
            <div className="selected_pokemon_container">
              {selectedpokemon &&
                selectedpokemon.map((el) => <Cards {...el} />)}
            </div>
          </div>
          <div className="text_button_container">
            <div className="warning">{message}</div>

            <div className="game_button_container">
              <div
                onClick={() => {
                  if (selectedpokemon.length >= 3) {
                    navigate("/Game", { state: { selectedpokemon } });
                  }
                }}
                className={
                  selectedpokemon.length >= 3
                    ? "game_start_button"
                    : "disabled_button"
                }
              >
                Game Start
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
