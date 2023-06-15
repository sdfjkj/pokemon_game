import React, { useState } from "react";

import {
  PokemonContainer,
  PokemonBox,
  PokemonImage,
  PokemonName,
  PokemonStat,
  IngamePokemonBox,
  Name,
  Stat,
  SettedPokemonBox,
  ComName,
  FightingPokemonImage,
  ButtonContainer,
  FightingPokemonContainer,
} from "./styled.js";


const img_list = [
  "front_default",
  "front_shiny",
  "front_female",
  "front_shiny_female",
];


export const BigCards = ({ pokemon, onClick, selected }) => {
  const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);
  return (
    <div>
      {pokemon && (
        <IngamePokemonBox
          style={selected ? { backgroundColor: "#c3fac4" } : {}}
          onClick={onClick}
        >
          <PokemonImage src={pokemon.sprites[imgSrc]} alt="pokemon" />
          <Name>{pokemon.forms[0].name}</Name>
          <Stat>
            hp :
            {pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat}
          </Stat>
          <Stat>
            attack :
            {
              pokemon.stats.find((stat) => stat.stat.name === "attack")
                .base_stat
            }
          </Stat>
          <Stat>
            defense :
            {
              pokemon.stats.find((stat) => stat.stat.name === "defense")
                .base_stat
            }
          </Stat>
          <Stat>
            special-attack :
            {
              pokemon.stats.find((stat) => stat.stat.name === "special-attack")
                .base_stat
            }
          </Stat>
          <Stat>
            special-defense :
            {
              pokemon.stats.find((stat) => stat.stat.name === "special-defense")
                .base_stat
            }
          </Stat>
          <Stat>
            speed :
            {pokemon.stats.find((stat) => stat.stat.name === "speed").base_stat}
          </Stat>
        </IngamePokemonBox>
      )}
    </div>
  );
};

export const SettedCards = ({ pokemon, onClick, ifSelected }) => {
  const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);
  console.log(pokemon.forms[0].name);
  if(ifSelected){console.log(ifSelected.forms[0].name);}
  
  return (
    <div>
      {pokemon && (
        <SettedPokemonBox onClick={onClick}  style={ifSelected ? (pokemon.forms[0].name === ifSelected.forms[0].name ? { backgroundColor: "#c3fac4" } : {}) : {}}>
          <PokemonImage src={pokemon.sprites[imgSrc]} alt="pokemon" />
          <ComName>{pokemon.forms[0].name}</ComName>
        </SettedPokemonBox>
      )}
    </div>
  );
};


export const FightingPokemon = ({ pokemon, flip }) => {
  const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);
  return (
    <div>
      {pokemon && (
        <div>
          <FightingPokemonImage flip={flip} src={pokemon.sprites[imgSrc]} alt="pokemon" />
          <ComName>{pokemon.forms[0].name}</ComName>
        </div>
      )}
    </div>
  );
};
