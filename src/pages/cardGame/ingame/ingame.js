import React, { useReducer, useEffect, useRef } from "react";
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
  turn: 0,
  selectedPokemon: null,
  comPokemon: [],
  selectedCard: null,
  isModalVisible: true,
  text: "Let's Win !!",
  myHp: 0,
  comHp: 0,
  count: 3,
  MyAttackType: null,
  comAttackType: null,
  disableSpecialComAttack: false,
  disableSpecialComDefense: false,
  buttonVisible: false,
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
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "SET_MY_HP":
      return { ...state, myHp: action.payload };
    case "SET_COM_HP":
      return { ...state, comHp: action.payload };
    case "decreaseCount":
      return { ...state, count: state.count - 1 };
    case "resetCount":
      return { ...state, count: 3 };
    case "SET_MY_ATTACK_TYPE":
      return { ...state, MyAttackType: action.payload };
    case "SET_COM_ATTACK_TYPE":
      return { ...state, comAttackType: action.payload };
    case "DISABLE_SPECIAL_COM_ATTACK":
      return { ...state, disableSpecialComAttack: true };
    case "DISABLE_SPECIAL_COM_DEFENSE":
      return { ...state, disableSpecialComDefense: true };
    case "SHOW_TYPE_BUTTON":
      return { ...state, buttonVisible: true };
    case "HIDE_TYPE_BUTTON":
      return { ...state, buttonVisible: false };
    default:
      throw new Error();
  }
};

// 타이머 해결하기 clearInterval이 제대로 안쳐먹는듯

export const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const stateRef = useRef(state);
  const location = useLocation();
  useEffect(() => {
    dispatch({
      type: "SET_MY_POKEMON",
      payload: location.state.selectedpokemon,
    });
    game_setting();
  }, []);

  useEffect(() => {
    if (state.comPokemon.length > 0 && state.isModalVisible === false) {
      settingHp();
    }
  }, [state.isModalVisible, state.selectedCard]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    dispatch({ type: "HIDE_TYPE_BUTTON" });
    if (state.isModalVisible === false) {
      const timer = setInterval(() => {
        if (stateRef.current.count > 0) {
          dispatch({ type: "decreaseCount" });
        } else {
          clearInterval(timer);
        }
      }, 1000);
      const timeoutId = setTimeout(afterCountdown, 4000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeoutId);
      };
    }
  }, [state.myHp, state.comHp]);

  const afterCountdown = () => {
    dispatch({ type: "SET_TURN" });
    dispatch({ type: "SHOW_TYPE_BUTTON" });
    dispatch({ type: "SET_TEXT", payload: `Turn ${state.turn}` });
    dispatch({ type: "resetCount" });
  };

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

      dispatch({ type: "SET_COM_POKEMON", payload: newPokemon });
    }
    fetchPokemonData();
  };

  const handleOk = () => {
    dispatch({ type: "SET_SELECTED_POKEMON", payload: null });
  };

  const clickedHandCard = (p) => {
    dispatch({ type: "SET_SELECTED_POKEMON", payload: p });
  };
  const checkPokemonHp = () => {
    if (state.myHp <= 0 || state.comHp <= 0) {
      const newSelectedCard =
        state.myPokemon[0] === state.selectedCard
          ? state.myPokemon[1]
          : state.myPokemon[0];
      dispatch({ type: "SET_SELECTED_CARD", payload: newSelectedCard });
    }
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
        (type === "special-attack" && state.disableSpecialComAttack) ||
        (type === "special-defense" && state.disableSpecialComDefense)
      ) {
        return false;
      }
      return true;
    });

    const randomIndex = Math.floor(Math.random() * availableAttackTypes.length);
    const selectedAttackType = availableAttackTypes[randomIndex];

    if (selectedAttackType === "special-attack") {
      dispatch({ type: "DISABLE_SPECIAL_COM_ATTACK" });
    } else if (selectedAttackType === "special-defense") {
      dispatch({ type: "DISABLE_SPECIAL_COM_DEFENSE" });
    }
    return selectedAttackType;
  };

  const settingHp = () => {
    const comPokemonHP = state.comPokemon[0].stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    dispatch({ type: "SET_COM_HP", payload: comPokemonHP });
    const myPokemonHP = state.selectedCard.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    dispatch({ type: "SET_MY_HP", payload: myPokemonHP });
  };

  const handleAttack = (attackType) => {
    if (state.selectedCard) {
      //hp
      //스피드
      let damage = 0;

      const comPokemonSpeed = state.comPokemon[0].stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;
      const myPokemonSpeed = state.selectedCard.stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;
      //회피 확률 - 양수 : 내가 회피 / 음수 : 컴터가 회피
      let speedDifference = myPokemonSpeed - comPokemonSpeed;

      //컴퓨터 스탯
      const comAttackType = getComRandomAttackType();
      console.log(comAttackType);
      const comPokemonType = state.comPokemon[0].stats.find(
        (stat) => stat.stat.name === comAttackType
      ).base_stat;
      console.log(comPokemonType);
      const myPokemonType = state.selectedCard.stats.find(
        (stat) => stat.stat.name === attackType
      ).base_stat;

      console.log(myPokemonType);

      dispatch({ type: "SET_COM_ATTACK_TYPE", payload: comAttackType });
      dispatch({ type: "SET_MY_ATTACK_TYPE", payload: attackType });

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
        dispatch({ type: "SET_MY_HP", payload: state.myHp - damage });
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
        dispatch({ type: "SET_COM_HP", payload: state.comHp - damage });
      }
    }
  };

  return (
    <IngamePage>
      <TurnCount>{state.text}</TurnCount>

      <Modal
        className="modal"
        title="첫 출전할 포켓몬을 고르세요."
        open={state.isModalVisible}
        centered="True"
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              if (state.selectedCard) {
                dispatch({ type: "HIDE_MODAL", payload: false });
              }
            }}
          >
            OK
          </Button>,
        ]}
        closable={false}
      >
        <ModalPokemonContainer>
          {state.myPokemon &&
            state.myPokemon.map((el) => (
              <BigCards
                pokemon={el}
                onClick={() =>
                  dispatch({ type: "SET_SELECTED_CARD", payload: el })
                }
                selected={state.selectedCard === el}
              />
            ))}
        </ModalPokemonContainer>
      </Modal>

      <Modal
        className="modal"
        title="Stats"
        open={state.selectedPokemon != null}
        centered="True"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        onCancel={handleOk}
      >
        {state.selectedPokemon && <BigCards pokemon={state.selectedPokemon} />}
      </Modal>

      <Hand>
        <div>
          <OwnerName>Com</OwnerName>
          <HandCards>
            {state.comPokemon &&
              state.comPokemon.map((el) => (
                <SettedCards pokemon={el} onClick={() => clickedHandCard(el)} />
              ))}
          </HandCards>
        </div>
        <div>
          <OwnerName>Me</OwnerName>
          <HandCards>
            {state.myPokemon &&
              state.myPokemon.map((el) => (
                <SettedCards pokemon={el} onClick={() => clickedHandCard(el)} />
              ))}
          </HandCards>
        </div>
      </Hand>
      <FightingZone>
        {state.comPokemon.length > 0 && (
          <FightingPokemon pokemon={state.comPokemon[0]} flip={true} />
        )}
        {state.selectedCard && (
          <FightingPokemon pokemon={state.selectedCard} flip={false} />
        )}
        {state.buttonVisible === true && (
          <div>
            {" "}
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
          </div>
        )}
      </FightingZone>
      <div>my hp : {state.myHp}</div>
      <div>my attacktype : {state.MyAttackType} </div>
      <div>com hp : {state.comHp}</div>
      <div>com attacktype : {state.comAttackType}</div>
      <div>{state.count}</div>
    </IngamePage>
  );
};
