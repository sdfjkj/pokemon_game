import React from "react";
import { RanderingPage, ButtonContainer, Zenigame, StyledLink } from "./styled";

export const Randering = () => {
  return (
    <RanderingPage>
      <Zenigame
        src="https://pokemon.itple.co.kr/public/img/pokemon/7.webp"
        alt="img2"
      />
      <ButtonContainer>
        <StyledLink to="/main">Poke Wiki</StyledLink>
        <StyledLink to="/Card_Game">Card Game</StyledLink>
        <StyledLink to="/MBTI">Poke MBTI</StyledLink>
        <StyledLink to="/PokeGame">PokeGame</StyledLink>
      </ButtonContainer>
    </RanderingPage>
  );
};