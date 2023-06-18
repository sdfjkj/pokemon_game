import React, { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BigCards,
  SettedCards,
  FightingPokemon,
} from "../../../components/cards/cards";

// Typography from antd

// overflow:hidden
// object-fit:cover

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
  ChooseTypeModal,
  StyledButton,
  ButtonColumnContainer,
  MessageModal,
  Message,
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
  text: "Let's Win !!",
  myHp: null,
  comHp: null,
  count: 3,
  MyAttackType: null,
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
  message: "",
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_STAGE":
      return { ...state, stage: action.payload };
    case "SET_TURN":
      return { ...state, turn: action.payload };
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
    default:
      throw new Error();
  }
};

// 타이머 해결하기 clearInterval이 제대로 안 되는듯

export const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const navigate = useNavigate();
  const stateRef = useRef(state);
  const location = useLocation();
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1010) + 1;
  };

  useEffect(() => {
    game_setting();
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (state.isModalVisible === false && state.myHp !== null) {
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
        if (stateRef.current.isModalVisible === false) afterCountdown();
      }, 4000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeoutId);
      };
    }
  }, [state.myHp, state.comHp]);

  useEffect(() => {
    console.log("도너츠",state.isModalVisible)
    if (state.comPokemon.length > 0 && state.isModalVisible === false) {
      if (state.myScore === 2 || state.comScore === 2) {
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

        //특수 공격 및 방어 on
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

  //카운트 다운 후에 실행되는 함수
  const afterCountdown = () => {
    dispatch({ type: "SET_TURN", payload: state.turn + 1 });
    dispatch({ type: "SHOW_TYPE_BUTTON" });
    dispatch({ type: "SET_TEXT", payload: `Turn ${state.turn}` });
    dispatch({ type: "resetCount" });
  };

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

  //스탯 확인 모달 열고 닫기
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
          dispatch({ type: "SET_COM_SCORE", payload: state.comScore + 1 });
        } else {
          dispatch({ type: "SET_MY_SCORE", payload: state.myScore + 1 });
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

  //애니메이션 실행 함수 (순수 함수)
  const animation = (myAttackType, comAttackType) => {
    if (myAttackType.includes("ack") && comAttackType.includes("ack")) {
      dispatch({ type: "SET_MY_MOVE", payload: "halfLeft" });
      dispatch({ type: "SET_COM_MOVE", payload: "halfRight" });
    } else if (myAttackType.includes("ack")) {
      dispatch({ type: "SET_MY_MOVE", payload: "left" });
    } else if (comAttackType.includes("ack")) {
      dispatch({ type: "SET_COM_MOVE", payload: "right" });
    }
    setTimeout(() => {
      dispatch({ type: "SET_MY_MOVE", payload: "stop" });
      dispatch({ type: "SET_COM_MOVE", payload: "stop" });
    }, 2000);
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
      if (comAttackType.includes("fense") && attackType.includes("fense")) {
        dispatch({
          type: "SET_MESSAGE",
          payload: "상대도 방어를 선택하였습니다.",
        });
        dispatch({ type: "SET_MY_HP", payload: state.myHp + 1 });
        dispatch({ type: "SET_COM_HP", payload: state.comHp + 1 });
      } else {
        if (comPokemonType > myPokemonType) {
          animation(attackType, comAttackType);
          if (speedDifference > 0 && Math.random() * 100 < speedDifference) {
            dispatch({
              type: "SET_MESSAGE",
              payload: "우리 포켓몬이 회피에 성공하였습니다.",
            });
            dispatch({ type: "SET_MY_HP", payload: state.myHp - 1 });
            return;
          } else {
            damage = comPokemonType - myPokemonType;
          }
          dispatch({ type: "SET_MY_HP", payload: state.myHp - damage });
        } else if (myPokemonType > comPokemonType) {
          animation(attackType, comAttackType);
          if (
            speedDifference < 0 &&
            Math.random() * 100 < Math.abs(speedDifference)
          ) {
            dispatch({
              type: "SET_MESSAGE",
              payload: "상대가 회피하였습니다!",
            });
            dispatch({ type: "SET_COM_HP", payload: state.comHp - 1 });
            return;
          } else {
            damage = myPokemonType - comPokemonType;
          }
          dispatch({ type: "SET_COM_HP", payload: state.comHp - damage });
        }
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
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
                dispatch({ type: "SET_TURN", payload: 1 });
                dispatch({ type: "SET_STAGE", payload: state.stage + 1 });
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
        footer={[
          <Button key="submit" type="primary" onClick={closeStatModal}>
            OK
          </Button>,
        ]}
        onCancel={closeStatModal}
      >
        <ModalPokemonContainer>
          {state.selectedPokemon && (
            <BigCards pokemon={state.selectedPokemon} />
          )}
        </ModalPokemonContainer>
      </SmallModalContainer>

      {/* 공격타입 선택 모달 */}
      <ChooseTypeModal
        title="공격 타입을 선택하세요."
        open={state.buttonVisible}
        centered="True"
        closable={false}
        footer={[]}
      >
        {state.buttonVisible === true && (
          <ButtonContainer>
            <ButtonColumnContainer>
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
            </ButtonColumnContainer>
            <ButtonColumnContainer>
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
            </ButtonColumnContainer>
          </ButtonContainer>
        )}
      </ChooseTypeModal>

      {/* 전투 후 메시지 모달 */}
      <MessageModal>
        <Message>{state.message}</Message>
      </MessageModal>
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
            <StyledLink to="/Result">랭킹보기</StyledLink>
            <StyledLink to="/Card_Game">다시 하기</StyledLink>
            <StyledLink to="/Main">홈으로</StyledLink>
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
                <TurnCount>Stage{state.stage}</TurnCount>

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

                    <State>{state.comAttackType}</State>
                    {state.comPokemon.length > 0 && (
                      <FightingPokemon
                        pokemon={state.selectedComCard}
                        flip={true}
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
                    <State>{state.MyAttackType} </State>
                    {state.selectedCard && (
                      <FightingPokemon pokemon={state.selectedCard} />
                    )}
                  </MyFightingContainer>
                </FightingZone>
              </FightingZoneContainer>
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
          <Count>{state.count}</Count>
        </>
      )}
    </IngamePage>
  );
};
