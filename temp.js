// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import {
//   BigCards,
//   SettedCards,
//   FightingPokemon,
// } from "../../../components/cards/cards";
// import { Button, Modal } from "antd";
// import {
//   IngamePage,
//   TurnCount,
//   ModalPokemonContainer,
//   Hand,
//   FightingZone,
// } from "./styled.js";

// export const Game = () => {
//   const location = useLocation();
//   const myPokemon = location.state.selectedpokemon;
//   const [turn, setTurn] = useState(1);
//   const [comPokemon, setComPokemon] = useState([]);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedPokemon, setSelectedPokemon] = useState(null);
//   const [selectedAttackType, setSelectedAttackType] = useState(null);
//   const [disableSpecialAttack, setDisableSpecialAttack] = useState(false);
//   const [disableSpecialDefense, setDisableSpecialDefense] = useState(false);

//   useEffect(() => {
//     game_setting();
//     showModal();
//   }, []);

//   const generateRandomNumber = () => {
//     return Math.floor(Math.random() * 1010) + 1;
//   };

//   const game_setting = () => {
//     const newNumbersSet = new Set();
//     while (newNumbersSet.size < 2) {
//       newNumbersSet.add(generateRandomNumber());
//     }

//     const newNumbers = [...newNumbersSet];

//     async function fetchPokemonData() {
//       const newPokemon = [];
//       for (let i = 0; i < 2; i++) {
//         const response = await axios.get(
//           `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
//         );
//         newPokemon.push(response.data);
//       }
//       setComPokemon(newPokemon);
//     }
//     fetchPokemonData();
//     setSelecedComPokemon(comPokemon[0])
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     // setSelectedPokemon(null);
//     setDisableSpecialAttack(false);
//     setDisableSpecialDefense(false);
//   };

//   const clickedHandCard = (p) => {
//     setSelectedPokemon(p);
//     showModal();
//   };

//   const nextTurn = () => {
//     setTurn((prevTurn) => prevTurn + 1);
//   };

//   const checkPokemonHp = (pokemon) =>{
//     const hp = pokemon.stats.find(
//       (stat) => stat.stat.name === "hp"
//     ).base_stat;
//     if(hp<=0){
      

//     }


//   }

//   const handleAttack = () => {
//     if (selectedCard) {
//       const comPokemonHP = comPokemon[0].stats.find(
//         (stat) => stat.stat.name === "hp"
//       ).base_stat;
//       const myPokemonHP = selectedPokemon.stats.find(
//         (stat) => stat.stat.name === "hp"
//       ).base_stat;
//       const comPokemonSpeed = comPokemon[0].stats.find(
//         (stat) => stat.stat.name === "speed"
//       ).base_stat;
//       const myPokemonSpeed = selectedPokemon.stats.find(
//         (stat) => stat.stat.name === "speed"
//       ).base_stat;
//       const comPokemonSpecialAttack = comPokemon[0].stats.find(
//         (stat) => stat.stat.name === "special-attack"
//       ).base_stat;
//       const myPokemonSpecialDefense = selectedPokemon.stats.find(
//         (stat) => stat.stat.name === "special-defense"
//       ).base_stat;

//       let damage = 0;
//       let dodgeChance = 0;

//       // 선택된 공격 유형에 따라 damage 계산
//       if (selectedAttackType === "attack") {
//         const comPokemonAttack = comPokemon[0].stats.find(
//           (stat) => stat.stat.name === "attack"
//         ).base_stat;
//         const myPokemonDefense = selectedPokemon.stats.find(
//           (stat) => stat.stat.name === "defense"
//         ).base_stat;
//         damage = comPokemonAttack - myPokemonDefense;
//       } else if (selectedAttackType === "special-attack") {
//         const myPokemonSpecialAttack = selectedPokemon.stats.find(
//           (stat) => stat.stat.name === "special-attack"
//         ).base_stat;
//         damage = comPokemonSpecialAttack - myPokemonSpecialAttack;
//         setDisableSpecialAttack(true); // 특수 공격은 한 번만 사용 가능하도록 설정
//       } else if (selectedAttackType === "defense") {
//         const comPokemonAttack = comPokemon[0].stats.find(
//           (stat) => stat.stat.name === "attack"
//         ).base_stat;
//         const myPokemonDefense = selectedPokemon.stats.find(
//           (stat) => stat.stat.name === "defense"
//         ).base_stat;
//         damage = comPokemonAttack - myPokemonDefense;
//       } else if (selectedAttackType === "special-defense") {
//         const myPokemonSpecialDefense = selectedPokemon.stats.find(
//           (stat) => stat.stat.name === "special-defense"
//         ).base_stat;
//         setDisableSpecialDefense(true); // 특수 방어는 한 번만 사용 가능하도록 설정
//       }

//       // 속도 차이에 따른 회피 확률 계산
//       const speedDifference = myPokemonSpeed - comPokemonSpeed;
//       if (speedDifference > 0) {
//         dodgeChance = speedDifference;
//       }

//       // 포켓몬의 HP 조정
//       const newComPokemonHP = comPokemonHP - damage;
//       const newMyPokemonHP = myPokemonHP;

//       if (Math.random() * 100 < dodgeChance) {
//         // 회피 성공 시
//         setSelectedCard(null);
//       } else {
//         // 회피 실패 시
//         if (newComPokemonHP <= 0) {
//           // 상대 포켓몬이 의진한 경우
//           setComPokemon([]);
//         } else if (newMyPokemonHP <= 0) {
//           // 내 포켓몬이 의진한 경우
//           const remainingPokemon = myPokemon.filter(
//             (pokemon) => pokemon.id !== selectedPokemon.id
//           );
//           setSelectedCard(null);
//           if (remainingPokemon.length === 0) {
//             // 모든 포켓몬이 의진한 경우
//             alert("게임 종료!");
//           } else {
//             // 다음 포켓몬 출전
//             setSelectedPokemon(remainingPokemon[0]);
//             showModal();
//           }
//         } else {
//           // 포켓몬들의 HP 업데이트
//           const newComPokemon = [...comPokemon];
//           newComPokemon[0].stats.find(
//             (stat) => stat.stat.name === "hp"
//           ).base_stat = newComPokemonHP;
//           const newSelectedPokemon = { ...selectedPokemon };
//           newSelectedPokemon.stats.find(
//             (stat) => stat.stat.name === "hp"
//           ).base_stat = newMyPokemonHP;
//           setComPokemon(newComPokemon);
//           setSelectedPokemon(newSelectedPokemon);
//         }
//       }
//     }
//   };

//   const handleDefense = () => {
//     // 선택된 공격 유형을 'defense'로 설정하여 handleAttack 함수 호출
//     setSelectedAttackType("defense");
//     handleAttack();
//   };

//   const handleSpecialAttack = () => {
//     if (!disableSpecialAttack) {
//       // 특수 공격이 사용 가능한 경우에만 실행
//       setSelectedAttackType("special-attack");
//       handleAttack();
//     }
//   };

//   const handleSpecialDefense = () => {
//     if (!disableSpecialDefense) {
//       // 특수 방어가 사용 가능한 경우에만 실행
//       setSelectedAttackType("special-defense");
//       handleAttack();
//     }
//   };

//   return (
//     <IngamePage>
//       <TurnCount>Turn {turn}</TurnCount>

//       <Modal
//         className="modal"
//         title="첫 출전할 포켓몬을 고르세요."
//         open={isModalVisible}
//         centered="True"
//         footer={[
//           <Button key="submit" type="primary" onClick={handleOk}>
//             OK
//           </Button>,
//         ]}
//         onCancel={handleOk}
//       >
//         <ModalPokemonContainer>
//           {myPokemon &&
//             myPokemon.map((el) => (
//               <BigCards
//                 pokemon={el}
//                 onClick={() => setSelectedCard(el)}
//                 selected={selectedCard === el}
//               />
//             ))}
//         </ModalPokemonContainer>
//       </Modal>

//       <Modal
//         className="modal"
//         title="Stats"
//         open={selectedPokemon !== null}
//         centered="True"
//         footer={[
//           <Button key="submit" type="primary" onClick={handleOk}>
//             OK
//           </Button>,
//         ]}
//         onCancel={handleOk}
//       >
//         {selectedPokemon && <BigCards pokemon={selectedPokemon} />}
//       </Modal>

//       <Hand>
//         <div className="com_pokemon">
//           {comPokemon.length > 0  &&
//             comPokemon.map((el) => (
//               <SettedCards pokemon={el} onClick={() => clickedHandCard(el)} />
//             ))}
//         </div>
//         <div>
//           {myPokemon &&
//             myPokemon.map((el) => (
//               <SettedCards pokemon={el} onClick={() => clickedHandCard(el)} />
//             ))}
//         </div>
//       </Hand>

//       <FightingZone>
//         {comPokemon.length > 0 && (
//           <FightingPokemon
//             pokemon={comPokemon[0]}
//             flip={true}
//             onClickAttack={handleAttack}
//             onClickDefense={handleDefense}
//             onClickSpecialAttack={handleSpecialAttack}
//             onClickSpecialDefense={handleSpecialDefense}
//           />
//         )}
//         {selectedCard && (
//           <FightingPokemon
//             pokemon={selectedCard}
//             flip={false}
//             onClickAttack={handleAttack}
//             onClickDefense={handleDefense}
//             onClickSpecialAttack={handleSpecialAttack}
//             onClickSpecialDefense={handleSpecialDefense}
//           />
//         )}
//       </FightingZone>
//     </IngamePage>
//   );
// };




