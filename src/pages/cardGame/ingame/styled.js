import styled from "styled-components";

export const IngamePage = styled.div`
  margin-top: 150px;
  width: 1020px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding-top: 20px;
  padding-bottom: 50px;
`;

export const TurnCount = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

export const ModalPokemonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Hand = styled.div`
  display: flex;
  width: 1000px;
  margin: 40px 0px;
`;

export const FightingZone = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-between;
`;

export const HandCards = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
`;

export const OwnerName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  font-style: italic;
  padding-bottom:20px;
`;
