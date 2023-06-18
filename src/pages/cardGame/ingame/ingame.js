/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  BigCards,
  SettedCards,
  FightingPokemon,
} from "../../../components/cards/cards";
import { useDispatch, useSelector } from "react-redux";
import { setTurn } from "../../../storage/actions";
import { Button } from "antd";

import {
  IngamePage,
  IngameContainer,
  FightingZoneContainer,
  FightingZoneContainerContainer,
  HandContainer,
  LabelText,
  NormalText,
  TurnCount,
  ModalPokemonContainer,
  ScoreContainer,
  FightingZone,
  HandCards,
  StyledButton,
  ChooseAttackType,
  ChooseAttackTypeText,
  LogTitle,
  MessageContainer,
  WinMessage,
  LoseMessage,
  LogContainer,
  StyledTable,
  StyledCellHead,
  StyledCell,
  Message,
  AttackTypeContainer,
  State,
  OwnerName,
  StyledLinkContainer,
  StyledLink,
  ButtonContainer,
  Count,
  BigModalContainer,
  SmallModalContainer,
  MyFightingContainer,
  ComFightingContainer,
  HpBar,
  MySpin,
  FinishModal,
  FinishModalContentsContainer,
  Result,
} from "./styled.js";

const initialState = {
  stage: 0,
  turn: 0,
  myPokemon: [],
  myPokemonInModal: [],
  selectedPokemon: null,
  comPokemon: [],
  selectedCard: null,
  selectedComCard: null,
  isModalVisible: false,
  myHp: null,
  comHp: null,
  count: 3,
  myAttackType: null,
  comAttackType: null,
  disableSpecialComAttack: false,
  disableSpecialComDefense: false,
  disableSpecialMyAttack: false,
  disableSpecialMyDefense: false,
  buttonVisible: false,
  myScore: 0,
  comScore: 0,
  finishModal: false,
  myMove: "stop",
  comMove: "stop",
  message: null,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_STAGE":
      return { ...state, stage: action.payload };
    case "SET_MY_POKEMON":
      return { ...state, myPokemon: action.payload };
    case "SET_MY_POKEMON_IN_MODAL":
      return { ...state, myPokemonInModal: action.payload };
    case "SET_SELECTED_POKEMON":
      return { ...state, selectedPokemon: action.payload };
    case "SET_COM_POKEMON":
      return { ...state, comPokemon: action.payload };
    case "SET_SELECTED_CARD":
      return { ...state, selectedCard: action.payload };
    case "SET_SELECTED_COM_CARD":
      return { ...state, selectedComCard: action.payload };
    case "SHOW_MODAL":
      return { ...state, isModalVisible: true };
    case "HIDE_MODAL":
      return { ...state, isModalVisible: false };
    case "SET_MY_HP":
      return { ...state, myHp: action.payload };
    case "SET_COM_HP":
      return { ...state, comHp: action.payload };
    case "decreaseCount":
      return { ...state, count: state.count - 1 };
    case "resetCount":
      return { ...state, count: 3 };
    case "SET_MY_ATTACK_TYPE":
      return { ...state, myAttackType: action.payload };
    case "SET_COM_ATTACK_TYPE":
      return { ...state, comAttackType: action.payload };
    case "DISABLE_SPECIAL_COM_ATTACK":
      return { ...state, disableSpecialComAttack: action.payload };
    case "DISABLE_SPECIAL_COM_DEFENSE":
      return { ...state, disableSpecialComDefense: action.payload };
    case "DISABLE_SPECIAL_MY_ATTACK":
      return { ...state, disableSpecialMyAttack: action.payload };
    case "DISABLE_SPECIAL_MY_DEFENSE":
      return { ...state, disableSpecialMyDefense: action.payload };
    case "SHOW_TYPE_BUTTON":
      return { ...state, buttonVisible: true };
    case "HIDE_TYPE_BUTTON":
      return { ...state, buttonVisible: false };
    case "SET_MY_SCORE":
      return { ...state, myScore: action.payload };
    case "SET_COM_SCORE":
      return { ...state, comScore: action.payload };
    case "SET_FINISH_MODAL":
      return { ...state, finishModal: action.payload };
    case "SET_MY_MOVE":
      return { ...state, myMove: action.payload };
    case "SET_COM_MOVE":
      return { ...state, comMove: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "ADD_TURN":
      return { ...state, turn: state.turn + 1 };
    default:
      throw new Error();
  }
};

export const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  // const navigate = useNavigate();
  const stateRef = useRef(state);
  const location = useLocation();

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };
  //리덕스
  const user = useSelector((state) => {
    return state;
  });

  const reduxdispatch = useDispatch();

  useEffect(() => {
    game_setting();
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (state.isModalVisible === false && state.myHp !== null) {
      dispatch({ type: "ADD_TURN" });

      //hp 체크
      checkPokemonHp();

      const timer = setInterval(() => {
        if (stateRef.current.count > 0) {
          dispatch({ type: "decreaseCount" });
        } else {
          clearInterval(timer);
        }
      }, 1000);
      const timeoutId = setTimeout(() => {
        if (stateRef.current.isModalVisible === false) {
          dispatch({ type: "SET_MESSAGE", payload: null });
          if (state.myScore !== 2 && state.comScore !== 2) {
            dispatch({ type: "SHOW_TYPE_BUTTON" });
          }
        }
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeoutId);
      };
    }
  }, [state.myHp, state.comHp]);

  useEffect(() => {
    if (state.comPokemon.length > 0 && state.isModalVisible === false) {
      if (state.myScore === 2 || state.comScore === 2) {
        console.log("state.turn",state.turn);
        console.log("user.id",user.id)
        if (user.id !== null) {
          reduxdispatch(setTurn(state.turn));
        }
        dispatch({ type: "SET_FINISH_MODAL", payload: true });

      } else {
        dispatch({
          type: "SET_SELECTED_COM_CARD",
          payload: state.comPokemon[state.stage],
        });
        const temp = state.myPokemonInModal.filter(
          (item) => item.forms[0].name !== state.selectedCard.forms[0].name
        );

        //다음 포켓몬 선택 모달 열림
        dispatch({ type: "SET_MY_POKEMON_IN_MODAL", payload: temp });

        //특수 공격 및 방어 on 어택타입 리셋
        dispatch({ type: "SET_MY_ATTACK_TYPE", payload: null });
        dispatch({ type: "SET_COM_ATTACK_TYPE", payload: null });
        dispatch({ type: "DISABLE_SPECIAL_COM_ATTACK", payload: false });
        dispatch({ type: "DISABLE_SPECIAL_COM_DEFENSE", payload: false });
        dispatch({ type: "DISABLE_SPECIAL_MY_ATTACK", payload: false });
        dispatch({ type: "DISABLE_SPECIAL_MY_DEFENSE", payload: false });
      }
    }
  }, [state.myScore, state.comScore]);

  useEffect(() => {
    if (state.myPokemonInModal.length > 0) {
      dispatch({ type: "SHOW_MODAL" });
    }
  }, [state.myPokemonInModal]);

  //게임 세팅
  const game_setting = () => {
    dispatch({
      type: "SET_MY_POKEMON",
      payload: location.state.selectedpokemon,
    });

    const newNumbersSet = new Set();
    while (newNumbersSet.size < 3) {
      newNumbersSet.add(generateRandomNumber());
    }
    const newNumbers = [...newNumbersSet];

    async function fetchPokemonData() {
      const newPokemon = [];
      for (let i = 0; i < 3; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
        );
        newPokemon.push(response.data);
      }

      dispatch({ type: "SET_COM_POKEMON", payload: newPokemon });
      dispatch({ type: "SET_SELECTED_COM_CARD", payload: newPokemon[0] });
    }
    fetchPokemonData();
    setTimeout(() => {
      dispatch({
        type: "SET_MY_POKEMON_IN_MODAL",
        payload: location.state.selectedpokemon,
      });
    }, 1500);
  };

  //스탯 확인하는 모달 열고 닫기
  const closeStatModal = () => {
    dispatch({ type: "SET_SELECTED_POKEMON", payload: null });
  };
  const openStatModal = (p) => {
    dispatch({ type: "SET_SELECTED_POKEMON", payload: p });
  };

  //hp 확인
  const checkPokemonHp = () => {
    if (state.myHp !== null && state.comHp !== null)
      if (state.myHp <= 0 || state.comHp <= 0) {
        if (state.myHp <= 0) {
          dispatch({ type: "SET_MY_HP", payload: 0 });
          setTimeout(() => {
            dispatch({ type: "SET_COM_SCORE", payload: state.comScore + 1 });
          }, 2000);
        } else {
          dispatch({ type: "SET_COM_HP", payload: 0 });
          setTimeout(() => {
            dispatch({ type: "SET_MY_SCORE", payload: state.myScore + 1 });
          }, 2000);
        }
      }
  };

  //컴퓨터 공격타입 (순수 함수)
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
      dispatch({ type: "DISABLE_SPECIAL_COM_ATTACK", payload: true });
    } else if (selectedAttackType === "special-defense") {
      dispatch({ type: "DISABLE_SPECIAL_COM_DEFENSE", payload: true });
    }
    return selectedAttackType;
  };

  //hp 세팅
  const settingHp = () => {
    const comPokemonHP = state.selectedComCard.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    dispatch({ type: "SET_COM_HP", payload: comPokemonHP });
    const myPokemonHP = state.selectedCard.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    dispatch({ type: "SET_MY_HP", payload: myPokemonHP });
  };

  //애니메이션 실행 함수 (나름 순수 함수)
  const animation = (myAttackType, comAttackType) => {
    //둘다 공격 : 회피 생각 안해도됨
    if (myAttackType.includes("ack") && comAttackType.includes("ack")) {
      dispatch({ type: "SET_MY_MOVE", payload: "halfLeft" });
      dispatch({ type: "SET_COM_MOVE", payload: "halfRight" });
    }
    //나만 공격 : 컴퓨터는 방어 -> 상대의 회피 생각
    else if (myAttackType.includes("ack")) {
      dispatch({ type: "SET_MY_MOVE", payload: "left" });
      if (comAttackType === "회피") {
        dispatch({ type: "SET_COM_MOVE", payload: "run" });
      } else {
        dispatch({ type: "SET_COM_MOVE", payload: "def" });
      }
    }
    //나는 방어 : 상대는 공격 -> 내 회피 생각
    else if (comAttackType.includes("ack")) {
      dispatch({ type: "SET_COM_MOVE", payload: "right" });

      if (myAttackType === "회피") {
        dispatch({ type: "SET_MY_MOVE", payload: "run" });
      } else {
        dispatch({ type: "SET_MY_MOVE", payload: "def" });
      }
    }
    //둘다 방어
    else {
      dispatch({ type: "SET_MY_MOVE", payload: "def" });
      dispatch({ type: "SET_COM_MOVE", payload: "def" });
    }
    setTimeout(() => {
      dispatch({ type: "SET_MY_MOVE", payload: "stop" });
      dispatch({ type: "SET_COM_MOVE", payload: "stop" });
    }, 2000);
  };

  //어택타입 한국어 변환
  const ChangeKorName = (object, name) => {
    const typeMapping = {
      attack: "공격",
      defense: "방어",
      "special-attack": "특수공격",
      "special-defense": "특수방어",
    };

    const baseStat = object.stats.find(
      (stat) => stat.stat.name === name
    )?.base_stat;

    return [typeMapping[name] || name, baseStat];
  };

  //공격타입 및 전투 및 데미지 계산 (안 순수 함수 : hp에 접근 흠..)
  const handleAttack = (attackType) => {
    if (state.selectedCard) {
      let damage = 0;

      //스피드 스탯으로 회피 확률 계산
      const comPokemonSpeed = state.selectedComCard.stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;
      const myPokemonSpeed = state.selectedCard.stats.find(
        (stat) => stat.stat.name === "speed"
      ).base_stat;
      //회피 확률 - 양수 : 내가 회피 / 음수 : 컴터가 회피
      let speedDifference = myPokemonSpeed - comPokemonSpeed;

      //컴퓨터 스탯
      const comAttackType = getComRandomAttackType();
      const comPokemonType = state.selectedComCard.stats.find(
        (stat) => stat.stat.name === comAttackType
      ).base_stat;
      const myPokemonType = state.selectedCard.stats.find(
        (stat) => stat.stat.name === attackType
      ).base_stat;
      dispatch({ type: "SET_COM_ATTACK_TYPE", payload: comAttackType });
      dispatch({ type: "SET_MY_ATTACK_TYPE", payload: attackType });

      if (attackType === "special-attack") {
        dispatch({ type: "DISABLE_SPECIAL_MY_ATTACK", payload: true });
      } else if (attackType === "special-defense") {
        dispatch({ type: "DISABLE_SPECIAL_MY_DEFENSE", payload: true });
      }

      //공격타입 선택 모달 닫기
      dispatch({ type: "HIDE_TYPE_BUTTON" });

      //데미지 계산
      //둘다 방어
      if (comAttackType.includes("fense") && attackType.includes("fense")) {
        animation(attackType, comAttackType);

        setTimeout(() => {
          dispatch({
            type: "SET_MESSAGE",
            payload: "상대도 방어를 선택하여 모두 데미지를 1씩 받았습니다.",
          });
          dispatch({ type: "SET_MY_HP", payload: state.myHp - 1 });
          dispatch({ type: "SET_COM_HP", payload: state.comHp - 1 });
        }, 1000);
      }
      //내가 공격, 상대가 방어
      else if (comAttackType.includes("fense")) {
        //상대 방어가 더 높은경우 : 회피 생각 x
        if (comPokemonType > myPokemonType) {
          animation(attackType, comAttackType);

          damage = comPokemonType - myPokemonType;
          setTimeout(() => {
            dispatch({
              type: "SET_MESSAGE",
              payload: `데미지를 ${damage} 받았습니다.`,
            });
            dispatch({ type: "SET_MY_HP", payload: state.myHp - damage });
          }, 1000);
        }
        //내 공격이 높은 경우 : 회피 생각 o
        else if (myPokemonType > comPokemonType) {
          //상대방이 회피에 성공한 경우
          if (speedDifference > 0 && Math.random() * 100 < speedDifference) {
            animation(attackType, "회피");
            setTimeout(() => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "상대 포켓몬이 회피에 성공하였습니다.",
              });
              dispatch({ type: "SET_COM_HP", payload: state.comHp - 1 });
            }, 1000);
            return;
          }
          //상대방이 회피에 실패한 경우
          else {
            animation(attackType, comAttackType);

            damage = myPokemonType - comPokemonType;
            setTimeout(() => {
              dispatch({
                type: "SET_MESSAGE",
                payload: `상대에게 ${damage}데미지를 주었습니다.`,
              });
              dispatch({ type: "SET_COM_HP", payload: state.comHp - damage });
            }, 1000);
          }
        } else {
          animation(attackType, comAttackType);
          setTimeout(() => {
            dispatch({
              type: "SET_MESSAGE",
              payload: `스탯이 같아 hp가 1씩 떨어졌습니다.`,
            });
            dispatch({ type: "SET_COM_HP", payload: state.comHp - 1 });
            dispatch({ type: "SET_MY_HP", payload: state.myHp - 1 });
          }, 1000);
        }
      }
      //내가 방어 상대가 공격
      else if (attackType.includes("fense")) {
        //내 방어가 더 높은경우 : 회피 생각 x
        if (myPokemonType > comPokemonType) {
          animation(attackType, comAttackType);
          damage = myPokemonType - comPokemonType;
          setTimeout(() => {
            dispatch({
              type: "SET_MESSAGE",
              payload: `데미지를 ${damage} 주었습니다.`,
            });
            dispatch({ type: "SET_COM_HP", payload: state.comHp - damage });
          }, 1000);
        }
        //상대방 공격이 높은 경우 : 회피 생각 o
        else if (myPokemonType < comPokemonType) {
          //내가 회피에 성공한 경우
          if (speedDifference > 0 && Math.random() * 100 < speedDifference) {
            animation("회피", comAttackType);
            setTimeout(() => {
              dispatch({
                type: "SET_MESSAGE",
                payload: "우리 포켓몬이 회피에 성공하였습니다.",
              });
              dispatch({ type: "SET_MY_HP", payload: state.myHp - 1 });
            }, 1000);
            return;
          }
          //내가 회피에 실패한 경우
          else {
            animation(attackType, comAttackType);
            damage = comPokemonType - myPokemonType;
            setTimeout(() => {
              dispatch({
                type: "SET_MESSAGE",
                payload: `데미지를 ${damage} 받았습니다.`,
              });
              dispatch({ type: "SET_MY_HP", payload: state.myHp - damage });
            }, 1000);
          }
        } else {
          animation(attackType, comAttackType);
          setTimeout(() => {
            dispatch({
              type: "SET_MESSAGE",
              payload: `스탯이 같아 hp가 1씩 떨어졌습니다.`,
            });
            dispatch({ type: "SET_COM_HP", payload: state.comHp - 1 });
            dispatch({ type: "SET_MY_HP", payload: state.myHp - 1 });
          }, 1000);
        }
      }
      //둘다 공격인 경우 : 회피 신경 x
      else {
        if (comPokemonType > myPokemonType) {
          animation(attackType, comAttackType);

          damage = comPokemonType - myPokemonType;
          setTimeout(() => {
            dispatch({
              type: "SET_MESSAGE",
              payload: `데미지를 ${damage} 받았습니다.`,
            });
            dispatch({ type: "SET_MY_HP", payload: state.myHp - damage });
          }, 1000);
        } else if (myPokemonType > comPokemonType) {
          animation(attackType, comAttackType);

          damage = myPokemonType - comPokemonType;
          setTimeout(() => {
            dispatch({
              type: "SET_MESSAGE",
              payload: `상대에게 ${damage}데미지를 주었습니다.`,
            });
            dispatch({ type: "SET_COM_HP", payload: state.comHp - damage });
          }, 1000);
        } else {
          animation(attackType, comAttackType);
          setTimeout(() => {
            dispatch({
              type: "SET_MESSAGE",
              payload: `스탯이 같아 hp가 1씩 떨어졌습니다.`,
            });
            dispatch({ type: "SET_COM_HP", payload: state.comHp - 1 });
            dispatch({ type: "SET_MY_HP", payload: state.myHp - 1 });
          }, 1000);
        }
      }
    }
  };

  

  return (
    <IngamePage>
      {/* //첫 포켓몬 선택 모달 */}
      <BigModalContainer
        title="출전할 포켓몬을 고르세요."
        open={state.isModalVisible}
        centered="True"
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              if (state.selectedCard) {
                settingHp();
                dispatch({ type: "SET_STAGE", payload: state.stage + 1 });
                dispatch({ type: "HIDE_MODAL", payload: false });
                dispatch({ type: "resetCount" });
              }
            }}
          >
            OK
          </Button>,
        ]}
        closable={false}
      >
        <ModalPokemonContainer>
          {state.myPokemonInModal &&
            state.myPokemonInModal.map((el) => (
              <BigCards
                pokemon={el}
                onClick={() => {
                  dispatch({ type: "SET_SELECTED_CARD", payload: el });
                }}
                selected={state.selectedCard === el}
              />
            ))}
        </ModalPokemonContainer>
      </BigModalContainer>

      {/* 세트된 카드 선택시 스탯 보여주는 모달 */}
      <SmallModalContainer
        title="Stats"
        open={state.selectedPokemon != null}
        centered="True"
        footer={[]}
        onCancel={closeStatModal}
        closable={false}
      >
        <ModalPokemonContainer>
          {state.selectedPokemon && (
            <BigCards pokemon={state.selectedPokemon} />
          )}
        </ModalPokemonContainer>
      </SmallModalContainer>

      {/* 종료 시 등장하는 모달 */}
      <FinishModal
        title=""
        open={state.finishModal}
        centered="True"
        footer={[]}
        closable={false}
      >
        <FinishModalContentsContainer>
          {state.myScore > state.comScore ? (
            <Result>승리!</Result>
          ) : (
            <Result>패배</Result>
          )}
          <StyledLinkContainer>
            <StyledLink to="/Result">
              기록 보기
            </StyledLink>
            <StyledLink to="/Card_Game">
              다시 하기
            </StyledLink>
            <StyledLink to="/Main">
              홈으로
            </StyledLink>
          </StyledLinkContainer>
        </FinishModalContentsContainer>
      </FinishModal>

      {/* 페이지 기본 컨텐츠 */}
      {state.selectedCard === null && <MySpin />}
      {state.selectedCard && (
        <>
          <ScoreContainer>
            <LabelText>Score</LabelText>
            <NormalText>
              {state.comScore} : {state.myScore}
            </NormalText>
          </ScoreContainer>
          <IngameContainer>
            <HandContainer>
              <OwnerName>Computer</OwnerName>
              <HandCards>
                {state.comPokemon &&
                  state.comPokemon.map((el) => (
                    <SettedCards
                      pokemon={el}
                      onClick={() => openStatModal(el)}
                      ifSelected={state.selectedComCard}
                    />
                  ))}
              </HandCards>
            </HandContainer>
            <FightingZoneContainerContainer>
              <FightingZoneContainer>
                <TurnCount>Round{state.stage}</TurnCount>
                <ChooseAttackType
                  bg={state.count !== 0 ? "transparent" : "#eefffc"}
                  shadow={
                    state.count !== 0
                      ? "none"
                      : "0px 5px 5px rgba(0, 0, 0, 0.15)"
                  }
                >
                  {state.count !== 0 ? (
                    <Count>{state.count}</Count>
                  ) : state.buttonVisible === true ? (
                    <>
                      <ChooseAttackTypeText>
                        내 포켓몬의 공격 형식을 선택하세요.
                      </ChooseAttackTypeText>
                      <ButtonContainer>
                        <StyledButton
                          onClick={() => {
                            handleAttack("attack");
                          }}
                        >
                          공격
                        </StyledButton>
                        <StyledButton
                          onClick={() => {
                            handleAttack("defense");
                          }}
                        >
                          방어
                        </StyledButton>
                        <StyledButton
                          onClick={() => {
                            handleAttack("special-attack");
                          }}
                          disabled={state.disableSpecialMyAttack}
                        >
                          특수공격
                        </StyledButton>
                        <StyledButton
                          onClick={() => {
                            handleAttack("special-defense");
                          }}
                          disabled={state.disableSpecialMyDefense}
                        >
                          특수방어
                        </StyledButton>
                      </ButtonContainer>
                    </>
                  ) : state.message !== null ? (
                    <MessageContainer>
                      {state.myHp === 0 ? (
                        <LoseMessage>{state.stage}라운드 패배</LoseMessage>
                      ) : state.comHp === 0 ? (
                        <WinMessage>{state.stage}라운드 승리</WinMessage>
                      ) : (
                        <></>
                      )}
                      <Message>{state.message}</Message>
                    </MessageContainer>
                  ) : (
                    <></>
                  )}
                </ChooseAttackType>
                <FightingZone>
                  <ComFightingContainer anime={state.comMove}>
                    <State>Hp : {state.comHp}</State>
                    {state.selectedComCard && (
                      <HpBar
                        percent={
                          (state.comHp /
                            state.selectedComCard.stats.find(
                              (stat) => stat.stat.name === "hp"
                            ).base_stat) *
                          100
                        }
                        showInfo={false}
                        strokeColor="#FF0000"
                      />
                    )}

                    {state.comPokemon.length > 0 && (
                      <FightingPokemon
                        pokemon={state.selectedComCard}
                        flip={true}
                        anime={state.comMove}
                      />
                    )}
                  </ComFightingContainer>
                  <MyFightingContainer anime={state.myMove}>
                    <State>Hp : {state.myHp}</State>
                    {state.selectedCard && (
                      <HpBar
                        percent={
                          (state.myHp /
                            state.selectedCard.stats.find(
                              (stat) => stat.stat.name === "hp"
                            ).base_stat) *
                          100
                        }
                        showInfo={false}
                        strokeColor="#FF0000"
                      />
                    )}
                    {state.selectedCard && (
                      <FightingPokemon
                        pokemon={state.selectedCard}
                        anime={state.myMove}
                      />
                    )}
                  </MyFightingContainer>
                </FightingZone>
              </FightingZoneContainer>
              {state.myAttackType !== null && state.comAttackType !== null && (
                <AttackTypeContainer>
                  <LogTitle>전투 로그</LogTitle>
                  <LogContainer>
                    <StyledTable>
                      <tbody>
                        <tr>
                          <StyledCellHead>Pokemon</StyledCellHead>
                          <StyledCell>
                            {state.selectedComCard.forms[0].name}
                          </StyledCell>
                        </tr>
                        <tr>
                          <StyledCellHead>Attack Type</StyledCellHead>
                          <StyledCell>
                            {
                              ChangeKorName(
                                state.selectedComCard,
                                state.comAttackType
                              )[0]
                            }
                          </StyledCell>
                        </tr>
                        <tr>
                          <StyledCellHead>Value</StyledCellHead>
                          <StyledCell>
                            {
                              ChangeKorName(
                                state.selectedComCard,
                                state.comAttackType
                              )?.[1]
                            }
                          </StyledCell>
                        </tr>
                      </tbody>
                    </StyledTable>
                    <StyledTable>
                      <tbody>
                        <tr>
                          <StyledCellHead>Pokemon</StyledCellHead>
                          <StyledCell>
                            {state.selectedCard.forms[0].name}
                          </StyledCell>
                        </tr>
                        <tr>
                          <StyledCellHead>Attack Type</StyledCellHead>
                          <StyledCell>
                            {
                              ChangeKorName(
                                state.selectedCard,
                                state.myAttackType
                              )[0]
                            }
                          </StyledCell>
                        </tr>
                        <tr>
                          <StyledCellHead>Value</StyledCellHead>
                          <StyledCell>
                            {
                              ChangeKorName(
                                state.selectedCard,
                                state.myAttackType
                              )?.[1]
                            }
                          </StyledCell>
                        </tr>
                      </tbody>
                    </StyledTable>
                  </LogContainer>
                </AttackTypeContainer>
              )}
            </FightingZoneContainerContainer>
            <HandContainer>
              <OwnerName>Me</OwnerName>
              <HandCards>
                {state.myPokemon &&
                  state.myPokemon.map((el) => (
                    <SettedCards
                      pokemon={el}
                      onClick={() => openStatModal(el)}
                      ifSelected={state.selectedCard}
                    />
                  ))}
              </HandCards>
            </HandContainer>
          </IngameContainer>
        </>
      )}
    </IngamePage>
  );
};
