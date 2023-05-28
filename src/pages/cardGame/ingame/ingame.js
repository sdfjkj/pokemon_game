import React,{useState, useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ingame.css";

export const Game = () => {
  const location = useLocation();
  const myPokemon = location.state.selectedpokemon;
  // const [mypokemon, setMypokemon] = useState([]);
  const [comPokemon, setComPokemon] = useState({});

  useEffect(()=>{
    game_setting();
  },[])


  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };

  const game_setting = () => {
    setComPokemon([]);
    const newNumbersSet = new Set();
    while (newNumbersSet.size < 2) {
      newNumbersSet.add(generateRandomNumber());
    }

    const newNumbers = [...newNumbersSet];

    async function fetchPokemonData() {
      for (let i = 0; i < 2; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
        );

        setComPokemon((pokemon) => [...pokemon, response.data]);
      }
    }
    fetchPokemonData();
  };


  const Cards = (pokemon) => {
    const img_list = [
      "front_default",
      "front_shiny",
      "front_female",
      "front_shiny_female",
    ];
    const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);
    return (
      <div>
        {pokemon && (
          <div className="ingame_pokemon_box">
            <img
              src={pokemon.sprites[imgSrc]}
              alt="pokemon"
              className="poke_img"
            />
            <div className="name">{pokemon.forms[0].name}</div>
            <div className="stat hp">
              hp :
              {pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat}
            </div>

            <div className="stat attack">
              attack :
              {
                pokemon.stats.find((stat) => stat.stat.name === "attack")
                  .base_stat
              }
            </div>

            <div className="stat defense">
              defense :
              {
                pokemon.stats.find((stat) => stat.stat.name === "defense")
                  .base_stat
              }
            </div>

            <div className="stat special-attack">
              special-attack :
              {
                pokemon.stats.find(
                  (stat) => stat.stat.name === "special-attack"
                ).base_stat
              }
            </div>

            <div className="stat special-defense">
              special-defense :
              {
                pokemon.stats.find(
                  (stat) => stat.stat.name === "special-defense"
                ).base_stat
              }
            </div>

            <div className="stat speed">
              speed :
              {
                pokemon.stats.find((stat) => stat.stat.name === "speed")
                  .base_stat
              }
            </div>
          </div>
        )}
      </div>
    );
  };
  // console.log(location.state.selectedpokemon); // 로그에 selectedpokemon 데이터가 출력됩니다.
  return (
    <div className="ingame_page">



      <div className="selected_pokemon_container">
        {myPokemon && myPokemon.map((el) => <Cards {...el} />)}
      </div>
    </div>
  );
};
