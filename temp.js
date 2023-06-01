import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  BigCards,
  SettedCards,
  FightingPokemon,
} from "../../../components/cards/cards";

import { Button, Modal } from "antd";
import {
  IngamePage,
  TurnCount,
  ModalPokemonContainer,
  Hand,
  FightingZone,
  HandCards,
  OwnerName,
} from "./styled.js";

const initialState = {
  myPokemon: [],
  turn: 1,
  selectedPokemon: null,
  comPokemon: [],
  selectedCard: null,
  isModalVisible: false,
  myHp: 0,
  comHp: 0,
  MyAttackType: null,
  comAttackType: null,
  disableSpecialComAttack: false,
  disableSpecialComDefense: false,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_MY_POKEMON":
      return { ...state, myPokemon: action.payload };
    case "SET_TURN":
      return { ...state, turn: state.turn + 1 };
    case "SET_SELECTED_POKEMON":
      return { ...state, selectedPokemon: action.payload };
    case "SET_COM_POKEMON":
      return { ...state, comPokemon: action.payload };
    case "SET_SELECTED_CARD":
      return { ...state, selectedCard: action.payload };
    case "SHOW_MODAL":
      return { ...state, isModalVisible: true };
    case "HIDE_MODAL":
      return { ...state, isModalVisible: false };
    case "SET_MY_HP":
      return { ...state, myHp: action.payload };
    case "SET_COM_HP":
      return { ...state, comHp: action.payload };
    case "SET_MY_ATTACK_TYPE":
      return { ...state, MyAttackType: action.payload };
    case "SET_COM_ATTACK_TYPE":
      return { ...state, comAttackType: action.payload };
    case "DISABLE_SPECIAL_COM_ATTACK":
      return { ...state, disableSpecialComAttack: true };
    case "DISABLE_SPECIAL_COM_DEFENSE":
      return { ...state, disableSpecialComDefense: true };
    default:
      throw new Error();
  }
};

export const Game = () => {
  const location = useLocation();
  const myPokemon = location.state.selectedpokemon;
  const [turn, setTurn] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // 추가: 선택된 포켓몬 상태
  const [comPokemon, setComPokemon] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myHp, setMyHp] = useState(0);
  const [comHp, setComHp] = useState(0);

  const [selectedAttackType, setSelectedAttackType] = useState(null);
  const [comAttackType, setComAttackType] = useState(null);

  const [disableSpecialComAttack, setDisableSpecialComAttack] = useState(false);
  const [disableSpecialComDefense, setDisableSpecialComDefense] =
    useState(false);

  useEffect(() => {
    game_setting();
    showModal();
  }, []);

  useEffect(() => {
    if (comPokemon.length > 0 && selectedCard) {
      settingHp();
    }
  }, [comPokemon, selectedCard]);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };

  const game_setting = () => {
    const newNumbersSet = new Set();
    while (newNumbersSet.size < 2) {
      newNumbersSet.add(generateRandomNumber());
    }

    const newNumbers = [...newNumbersSet];

    async function fetchPokemonData() {
      const newPokemon = [];
      for (let i = 0; i < 2; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
        );
        newPokemon.push(response.data);
      }
      setComPokemon(newPokemon);
    }
    fetchPokemonData();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedPokemon(null); // 변경: 선택된 포켓몬 상태를 null로 설정
  };

  const clickedHandCard = (p) => {
    setSelectedPokemon(p); // 추가: 선택된 포켓몬 상태 설정
    showModal(); // 추가: 모달 보이기
  };

  const nextTurn = () => {
    setTurn((prevTurn) => prevTurn + 1);
  };
  const getComRandomAttackType = () => {
    const attackTypes = [
      "attack",
      "defense",
      "special-attack",
      "special-defense",
    ];
    const availableAttackTypes = attackTypes.filter((type) => {
      if (
        (type === "special-attack" && disableSpecialComAttack) ||
        (type === "special-defense" && disableSpecialComDefense)
      ) {
        return false;
      }
      return true;
    });

    const randomIndex = Math.floor(Math.random() * availableAttackTypes.length);
    const selectedAttackType = availableAttackTypes[randomIndex];

    if (selectedAttackType === "special-attack") {
      setDisableSpecialComAttack(true);
    } else if (selectedAttackType === "special-defense") {
      setDisableSpecialComDefense(true);
    }
    return selectedAttackType;
  };

  // const checkPokemonHp = (pokemon) =>{
  //   const hp = pokemon.stats.find(
  //     (stat) => stat.stat.name === "hp"
  //   ).base_stat;
  //   setMyHp(hp);
  //   if(hp<=0){
  //     setTurn((prevTurn) => prevTurn + 1);
  //   }

  // }
  const settingHp = () => {
    const comPokemonHP = comPokemon[0].stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    setComHp(comPokemonHP);
    const myPokemonHP = selectedCard.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    setMyHp(myPokemonHP);
  };

  const handleAttack = (attackType) => {
    if (selectedCard) {
      //hp
      //스피드
      let damage = 0;

      const comPokemonSpeed = comPokemon[0].stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;
      const myPokemonSpeed = selectedCard.stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;
      //회피 확률 - 양수 : 내가 회피 / 음수 : 컴터가 회피
      let speedDifference = myPokemonSpeed - comPokemonSpeed;

      //컴퓨터 스탯

      const comAttackType = getComRandomAttackType();
      console.log(comAttackType);
      const comPokemonType = comPokemon[0].stats.find(
        (stat) => stat.stat.name === comAttackType
      ).base_stat;
      console.log(comPokemonType);
      // const comPokemonDefense = selectedComCard.stats.find(
      //   (stat) => stat.stat.name === "defense"
      // ).base_stat;

      // const comPokemonSpecialAttack = selectedComCard.stats.find(
      //   (stat) => stat.stat.name === "special-attack"
      // ).base_stat;

      // const comPokemonSpecialDefense = selectedComCard.stats.find(
      //   (stat) => stat.stat.name === "special-defense"
      // ).base_stat;
      const myPokemonType = selectedCard.stats.find(
        (stat) => stat.stat.name === attackType
      ).base_stat;

      console.log(myPokemonType);

      setComAttackType(comAttackType);
      setSelectedAttackType(attackType);

      //데미지 계산
      if (comPokemonType > myPokemonType) {
        if (comPokemonType === "defense" && myPokemonType === "defense") {
          return;
        } else if (
          speedDifference > 0 &&
          Math.random() * 100 < speedDifference
        ) {
          console.log("회피");
          return;
        } else {
          damage = comPokemonType - myPokemonType;
        }
        setMyHp((prev) => prev - damage);
      } else if (myPokemonType > comPokemonType) {
        if (comPokemonType === "defense" && myPokemonType === "defense") {
          return;
        } else if (
          speedDifference < 0 &&
          Math.random() * 100 < Math.abs(speedDifference)
        ) {
          console.log("회피1");
          return;
        } else {
          damage = myPokemonType - comPokemonType;
        }
        setComHp((prev) => prev - damage);
      }
    }
  };

  const ComputeDamage = () => {};

  // const handleAttack1 = () => {
  //   setSelectedAttackType("attack");
  //   handleAttack();
  // };
  // const handleDefense = () => {
  //   setSelectedAttackType("defense");
  //   handleAttack();
  // };

  // const handleSpecialAttack = () => {
  //   if (!disableSpecialMyAttack) {
  //     setSelectedAttackType("special-attack");
  //     handleAttack();
  //   }
  // };

  // const handleSpecialDefense = () => {
  //   if (!disableSpecialMyDefense) {
  //     // 특수 방어가 사용 가능한 경우에만 실행
  //     setSelectedAttackType("special-defense");
  //     handleAttack();
  //   }
  // };

  return (
    <IngamePage>
      <TurnCount>Turn {turn}</TurnCount>

      <Modal
        className="modal"
        title="첫 출전할 포켓몬을 고르세요."
        open={isModalVisible}
        centered="True"
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              if (selectedCard) {
                handleOk();
              }
            }}
          >
            OK
          </Button>,
        ]}
        closable={false}
      >
        <ModalPokemonContainer>
          {myPokemon &&
            myPokemon.map((el) => (
              <BigCards
                pokemon={el}
                onClick={() => setSelectedCard(el)}
                selected={selectedCard === el}
              />
            ))}
        </ModalPokemonContainer>
      </Modal>

      <Modal
        className="modal"
        title="Stats"
        open={selectedPokemon != null}
        centered="True"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        onCancel={handleOk}
      >
        {selectedPokemon && <BigCards pokemon={selectedPokemon} />}
      </Modal>

      <Hand>
        <div>
          <OwnerName>Com</OwnerName>
          <HandCards>
            {comPokemon &&
              comPokemon.map((el) => (
                <SettedCards pokemon={el} onClick={() => clickedHandCard(el)} />
              ))}
          </HandCards>
        </div>
        <div>
          <OwnerName>Me</OwnerName>
          <HandCards>
            {myPokemon &&
              myPokemon.map((el) => (
                <SettedCards pokemon={el} onClick={() => clickedHandCard(el)} />
              ))}
          </HandCards>
        </div>
      </Hand>
      <FightingZone>
        {comPokemon.length > 0 && (
          <FightingPokemon pokemon={comPokemon[0]} flip={true} />
        )}
        {selectedCard && (
          <FightingPokemon pokemon={selectedCard} flip={false} />
        )}
        <Button
          onClick={() => {
            handleAttack("attack");
          }}
        >
          공격
        </Button>
        <Button
          onClick={() => {
            handleAttack("defense");
          }}
        >
          방어
        </Button>
        <Button
          onClick={() => {
            handleAttack("special-attack");
          }}
        >
          특수공격
        </Button>
        <Button
          onClick={() => {
            handleAttack("special-defense");
          }}
        >
          특수방어
        </Button>
      </FightingZone>
      <div>my hp : {myHp}</div>
      <div>my attacktype : {selectedAttackType} </div>
      <div>com hp : {comHp}</div>
      <div>com attacktype : {comAttackType}</div>
    </IngamePage>
  );
};

// onClickAttack={()=>{handleAttack("attack")}}
// onClickDefense={()=>{handleAttack("defense")}}
// onClickSpecialAttack={()=>{handleAttack("special-attack")}}
// onClickSpecialDefense={()=>{handleAttack("special-defense")}}
