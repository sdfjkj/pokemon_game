import styled from "styled-components";

export const PokemonContainer = styled.div`
  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    `
  `}
`;
export const PokemonImage = styled.img`
  width: 130px;
`;

export const IngamePokemonBox = styled.div`
  border: 1px solid black;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 20px 30px;
  cursor: pointer;
`;

export const Stat = styled.div`
  font-weight: bold;
`;

export const Name = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

export const SettedPokemonBox = styled.div`
  border: 1px solid black;
  cursor: pointer;
  width: 130px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  background-color: white;
`;

export const ComName = styled.div`
  text-align: center;
`;

export const FightingPokemonImage = styled.img`
  width: 180px;
  border: ${({ anime }) => (anime === "def" ? "2.5px solid blue" : "none")};
  border-radius: ${({ anime }) => (anime === "def" ? "50%" : "none")};

  transform: ${(props) => (props.flip ? "scaleX(-1)" : "none")};
`;

export const FightingPokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  button {
    margin-right: 5px;
  }
`;
