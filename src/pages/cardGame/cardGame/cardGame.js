import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LobbyPage,
  Title,
  CardBox,
  SettingButton,
  StartButton,
  ButtonContainer,
  CardContainer,
  SelectedCardText,
  CardText,
  SelectedPokemonContainer,
  MessageBox,
  ContentsContainer,
  SelectContentsContainer,
} from "./styled.js";

import { useNavigate } from "react-router-dom";

export const CardGame = () => {
  const [countLoading, setCountLoading] = useState(0);
  const [disableLoad, setDisableLoad] = useState(false);
  const [mypokemon, setMypokemon] = useState([]);
  const [selectedpokemon, setselectedpokemon] = useState([]);
  const [message, setMessage] = useState("포켓몬을 로드하세요.");

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedpokemon.length > 0) {
      if (selectedpokemon.length >= 3) {
        setMessage("선택 완료");
      } else {
        setMessage("포켓몬을 세 마리 선택하세요.");
      }
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
      <>
        {pokemon && (
          <CardBox
            isSelected={isSelected}
            onClick={() => handlePokemonSelect(pokemon)}
          >
            <img
              src={pokemon.sprites[imgSrc]}
              alt="pokemon"
              className="poke_img"
            />
            <CardText>{pokemon.forms[0].name}</CardText>
            <CardText>
              attack :
              {
                pokemon.stats.find((stat) => stat.stat.name === "attack")
                  .base_stat
              }
            </CardText>
          </CardBox>
        )}
      </>
    );
  };

  const game_setting = () => {

    if (disableLoad) { 
      return;
    }
    setDisableLoad(true);

    setCountLoading(countLoading + 1);
    if (countLoading > 4) {
      alert("로드 횟수 초과");
      return;
    }
    setselectedpokemon([]);
    setMypokemon([]); //이게 비동기적이라 한번에 빠르게 누르면 초과해서 로드ㅠㅠ
    
    const newNumbersSet = new Set();
    while (newNumbersSet.size < 6) {
      newNumbersSet.add(generateRandomNumber());
    }

    const newNumbers = [...newNumbersSet];

    async function fetchPokemonData() {
      for (let i = 0; i < 6; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newNumbers[i]}`
        );
        setMypokemon((mypokemon) => [...mypokemon, response.data]);
      }
      setDisableLoad(false);

    }
    fetchPokemonData();
  };

  return (
    <LobbyPage>
      <Title>Lobby</Title>{" "}
      <ButtonContainer>
        <SettingButton onClick={game_setting} disabled={disableLoad}>
          Load Pokemon
        </SettingButton>
        <StartButton
          isDisabled={selectedpokemon.length < 3}
          onClick={() => {
            if (selectedpokemon.length >= 3) {
              navigate("/Game", { state: { selectedpokemon } });
            }
          }}
        >
          Game Start
        </StartButton>
      </ButtonContainer>
      <ContentsContainer>
        <SelectContentsContainer>
          <MessageBox>{message}</MessageBox>
          <CardContainer>
            {mypokemon && mypokemon.map((el) => <Cards {...el} />)}
          </CardContainer>
        </SelectContentsContainer>
        <SelectedPokemonContainer>
          <SelectedCardText>Selected Pokemon</SelectedCardText>
          {selectedpokemon && selectedpokemon.map((el) => <Cards {...el} />)}
        </SelectedPokemonContainer>
      </ContentsContainer>
    </LobbyPage>
  );
};
