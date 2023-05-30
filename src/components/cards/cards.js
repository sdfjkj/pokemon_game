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

export const RandomCards = ({ pokemon, onClick, selected }) => {
  const isSelected = selected.some((selected) => selected.id === pokemon.id);
  const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);

  return (
    <PokemonContainer isSelected={isSelected} onClick={() => onClick}>
      {pokemon && (
        <PokemonBox>
          <PokemonImage src={pokemon.sprites[imgSrc]} alt="pokemon" />
          <PokemonName>{pokemon.forms[0].name}</PokemonName>
          <PokemonStat>
            attack :
            {
              pokemon.stats.find((stat) => stat.stat.name === "attack")
                .base_stat
            }
          </PokemonStat>
        </PokemonBox>
      )}
    </PokemonContainer>
  );
};

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

export const SettedCards = ({ pokemon, onClick }) => {
  const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);
  return (
    <div>
      {pokemon && (
        <SettedPokemonBox onClick={onClick}>
          <PokemonImage src={pokemon.sprites[imgSrc]} alt="pokemon" />
          <ComName>{pokemon.forms[0].name}</ComName>
        </SettedPokemonBox>
      )}
    </div>
  );
};

// export const FightingPokemon = ({
//   pokemon,
//   flip,
//   onClickAttack,
//   onClickDefense,
//   onClickSpecialAttack,
//   onClickSpecialDefense,
// }) => {
//   const [isAttackMenuOpen, setAttackMenuOpen] = useState(false);

//   const handleAttackClick = () => {
//     setAttackMenuOpen(!isAttackMenuOpen);
//   };

//   // const handleAttackSelection = (attackType) => {
//   //   switch (attackType) {
//   //     case "attack":
//   //       onClickAttack();
//   //       break;
//   //     case "defense":
//   //       onClickDefense();
//   //       break;
//   //     case "special-attack":
//   //       onClickSpecialAttack();
//   //       break;
//   //     case "special-defense":
//   //       onClickSpecialDefense();
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   //   setAttackMenuOpen(false);
//   // };

//   const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);

//   return (
//     <FightingPokemonContainer>
//       {pokemon && (
//         <div>
//           <PokemonImage
//             src={pokemon.sprites[imgSrc]}
//             alt="pokemon"
//             flip={flip}
//           />
//           <ComName>{pokemon.forms[0].name}</ComName>
//           <ButtonContainer>
//             <button onClick={handleAttackClick}>공격 유형 선택</button>
//             {isAttackMenuOpen && (
//               <div>
//                 <button onClick={onClickAttack}>
//                   공격
//                 </button>
//                 <button onClick={onClickDefense}>
//                   방어
//                 </button>
//                 <button onClick={onClickSpecialAttack}>
//                   특수 공격
//                 </button>
//                 <button
//                   onClick={onClickSpecialDefense}
//                 >
//                   특수 방어
//                 </button>
//               </div>
//             )}
//           </ButtonContainer>
//         </div>
//       )}
//     </FightingPokemonContainer>
//   );
// };

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
// export const RandomCards = ({pokemon, onClick, selected}) =>{

//   const isSelected = selected.some(
//     (selected) => selected.id === pokemon.id
//   );
//   const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);

//   return(
//     <div
//     className={`pokemon_container ${isSelected ? "selected" : ""}`}
//     onClick={() => onClick}
//   >
//     {pokemon && (
//       <div className="pokemon_box">
//         <img
//           src={pokemon.sprites[imgSrc]}
//           alt="pokemon"
//           className="poke_img"
//         />
//         <div className="pokemon_name">{pokemon.forms[0].name}</div>
//         <div className="pokemon_stat_attack">
//           attack :
//           {
//             pokemon.stats.find((stat) => stat.stat.name === "attack")
//               .base_stat
//           }
//         </div>
//       </div>
//     )}
//   </div>

//   )

// }

// export const BigCards = ({ pokemon, onClick, selected  }) => {
//   const cardStyle = selected ? { backgroundColor: "#c3fac4" } : {};
//   const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);
//   return (
//     <div>
//       {pokemon && (
//         <div className="ingame_pokemon_box" style={cardStyle} onClick={onClick}>
//           <img
//             src={pokemon.sprites[imgSrc]}
//             alt="pokemon"
//             className="poke_img"
//           />
//           <div className="name">{pokemon.forms[0].name}</div>
//           <div className="stat hp">
//             hp :
//             {pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat}
//           </div>

//           <div className="stat attack">
//             attack :
//             {
//               pokemon.stats.find((stat) => stat.stat.name === "attack")
//                 .base_stat
//             }
//           </div>

//           <div className="stat defense">
//             defense :
//             {
//               pokemon.stats.find((stat) => stat.stat.name === "defense")
//                 .base_stat
//             }
//           </div>

//           <div className="stat special-attack">
//             special-attack :
//             {
//               pokemon.stats.find((stat) => stat.stat.name === "special-attack")
//                 .base_stat
//             }
//           </div>

//           <div className="stat special-defense">
//             special-defense :
//             {
//               pokemon.stats.find((stat) => stat.stat.name === "special-defense")
//                 .base_stat
//             }
//           </div>

//           <div className="stat speed">
//             speed :
//             {pokemon.stats.find((stat) => stat.stat.name === "speed").base_stat}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export const SettedCards = ({pokemon}) => {
//   const imgSrc = img_list.find((img) => pokemon.sprites[img] !== null);
//   return (
//     <div>
//       {pokemon && (
//         <div className="setted_pokemon_box">
//           <img
//             src={pokemon.sprites[imgSrc]}
//             alt="pokemon"
//             className="poke_img"
//           />
//           <div className="com_name">{pokemon.forms[0].name}</div>
//         </div>
//       )}
//     </div>
//   );
// };
