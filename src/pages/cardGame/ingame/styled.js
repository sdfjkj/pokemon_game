import styled from "styled-components";

export const IngamePage = styled.div`
  margin-top: 110px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 50px;
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  

`;

export const IngameContainer = styled.div`
  width:80%;
  display:flex;
  justify-content: space-between;
`;

export const HandContainer= styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width:170px;

`;


export const FightingZoneContainerContainer= styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

export const FightingZoneContainer= styled.div`
  height:450px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width:900px;
  margin-top:20px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url("https://wallpaperaccess.com/full/418495.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  padding:40px 30px;


`;

export const FightingZone = styled.div`
  display: flex;
  width: 100%;
  height:100%;
  align-items:flex-end;
  justify-content: space-between;


`;




export const LabelText = styled.div`
  font-weight: bold;
  font-size:30px;
`;
export const TurnCount = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

export const NormalText = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

export const ModalPokemonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// export const Hand = styled.div`
//   display: flex;
//   width: 1000px;
//   margin: 20px 0px;
// `;


export const HandCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

export const OwnerName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  font-style: italic;
  padding-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MyZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;