import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Modal, Progress } from "antd";
import { Spin } from "antd";

export const IngamePage = styled.div`
  margin-top: 110px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 50px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("https://png.pngtree.com/background/20211215/original/pngtree-modern-simple-elegant-landing-page-website-background-picture-image_1455134.jpg");

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const IngameContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

export const HandContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
  border-radius: 15px;
  background-color: #eefffc;
  padding: 30px 10px;
  height: 650px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  margin-top: 40px;
`;

export const FightingZoneContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

export const FightingZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 90%;
  margin-top: 40px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("https://wallpaperaccess.com/full/418495.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  padding: 40px 30px;
  border: 0.2px solid beige;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
`;

export const FightingZone = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

export const LabelText = styled.div`
  font-weight: bold;
  font-size: 30px;
  text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;
export const TurnCount = styled.div`
  font-weight: bold;
  font-size: 27px;
  font-style: italic;
  text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;

export const NormalText = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

export const HandCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const OwnerName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  font-style: italic;
  padding-bottom: 20px;
  text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;

export const ChooseAttackType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 130px;
  background-color: ${(props) => (props.bg ? props.bg : "transparent")};
  margin-top: 40px;
  margin-bottom: 80px;
  border-radius: 15px;
  box-shadow: ${(props) => (props.shadow ? props.shadow : "none")};
`;

export const ChooseAttackTypeText = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 18px;

  font-style: italic;
  color: #0092ff;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 455px;
  padding: 2px 30px;
`;

export const WinMessage = styled.div`
  font-weight: bold;
  font-size: 23px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  text-align: center;
  color: blue;
`;
export const LoseMessage = styled.div`
  font-weight: bold;
  font-size: 23px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  text-align: center;
  color: red;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 455px;
  padding: 30px;
`;

export const Message = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #4f4f4f;
`;

export const LogTitle = styled.div`
font-weight: bold;
font-size: 25px;
margin-bottom: 30px;
text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
`;
export const LogContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width:85%;
`;



export const StyledTable = styled.table`
  border-collapse: collapse;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
`;

export const StyledCell = styled.td`
  border: 1px solid black;
  padding: 10px;
  width:150px;
  text-align: center;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);

`;

export const StyledCellHead = styled.td`
  border: 1px solid black;
  padding: 10px;
  width:100px;
  background-color: #ffa842;
  font-weight: bold;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);

`;



export const AttackTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 90%;
  padding: 30px 30px 50px 30px;
  border:1px solid black;
  margin-top: 40px;
  border-radius: 15px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  margin-bottom:100px;
`;

export const StyledButton = styled.button`
  background-color: ${(props) => (props.disabled ? "grey" : "#ffa842")};
  width: 100px;
  font-weight: bold;
  font-size: 17px;
  padding: 5px 3px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  \ &:hover {
    background-color: ${(props) => (props.disabled ? "grey" : "#ffc97e")};
  }
`;

export const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-top: 40px;
`;

export const StyledLink = styled(Link)`
  border-radius: 15px;
  background-color: #ffa842;
  font-size: 23px;
  color: white;
  font-weight: bold;
  padding: 6px 20px;
  width: 100px;
  text-align: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
`;

export const FinishModal = styled(Modal)`
  width: 700px !important;
`;

export const FinishModalContentsContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("https://cdn.pixabay.com/photo/2020/09/09/02/12/smearing-5556288_960_720.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
`;

export const Result = styled.div`
  font-size: 50px;
  font-style: italic;
  text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  font-weight: bold;
  color: #575757;
`;

export const State = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;

export const Count = styled.div`
  text-align: center;
  font-size: 40px;
  font-style: italic;
  font-weight: bold;
  border-radius: 15px;
  padding: 3px 10px;
  height: 100%;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HpBar = styled(Progress)`
  width: 100px;
`;

export const ModalPokemonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

export const BigModalContainer = styled(Modal)`
  width: 700px !important;
`;

export const SmallModalContainer = styled(Modal)`
  width: 400px !important;
`;

export const MySpin = styled(Spin)`
  margin: 300px 0px;
`;

export const MyFightingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  animation: ${({ anime }) => {
    if (anime === "stop") return "none";
    if (anime === "run")
      return css`
        ${runRight} 1.5s forwards
      `;
    if (anime === "left")
      return css`
        ${moveLeft} 1.5s forwards
      `;

    if (anime === "halfLeft")
      return css`
        ${moveHalfLeft} 1.5s forwards
      `;
    return "none";
  }};
`;

export const ComFightingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center center;
  animation: ${({ anime }) => {
    if (anime === "stop") return "none";
    if (anime === "run")
      return css`
        ${runLeft} 1.5s forwards
      `;
    if (anime === "right")
      return css`
        ${moveRight} 1.5s forwards
      `;
    if (anime === "halfRight")
      return css`
        ${moveHalfRight} 1.5s forwards
      `;
    return "none";
  }};
`;
const runRight = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(60px, -60px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const runLeft = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-60px, -60px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-300px);
  }
  100% {
    transform: translateX(0);
  }
`;

const moveRight = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(300px);
  }
  100% {
    transform: translateX(0);
  }
`;
const moveHalfLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-150px);
  }
  100% {
    transform: translateX(0);
  }
`;

const moveHalfRight = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(150px);
  }
  100% {
    transform: translateX(0);
  }
`;
