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
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
`;

export const FightingZoneContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

export const FightingZoneContainer = styled.div`
  height: 450px;
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
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  border: 0.2px solid beige;
`;

export const FightingZone = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  align-items: flex-end;
  justify-content: space-between;
`;

export const LabelText = styled.div`
  font-weight: bold;
  font-size: 30px;
`;
export const TurnCount = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

export const NormalText = styled.div`
  font-weight: bold;
  font-size: 25px;
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

export const ChooseTypeModal = styled(Modal)`
  width: 260px !important;
  margin-top: 100px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 215px;
`;

export const ButtonColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 20px 0px;
`;

export const StyledButton = styled.button`
  background-color: ${(props) => (props.disabled ? "grey" : "#ffa842")};
  width: 90px;
  font-size: 16px;
  padding: 5px 0px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};\
  &:hover {
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

export const MessageModal = styled(Modal)`
  width: 700px !important;
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

export const Message = styled.div``;

export const State = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: rgb(72, 72, 72);
`;

export const Count = styled.div`
  width: 40px;
  text-align: center;
  position: relative;
  bottom: 570px;
  left: 350px;
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 3px 10px;
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
  animation: ${({ anime }) => {
    if (anime === "stop") return "none";
    if (anime === "left")
      return css`
        ${moveLeft} 1s forwards
      `;
    if (anime === "right")
      return css`
        ${moveRight} 1s forwards
      `;
    if (anime === "halfLeft")
      return css`
        ${moveHalfLeft} 1s forwards
      `;
    if (anime === "halfRight")
      return css`
        ${moveHalfRight} 1s forwards
      `;
    return "none";
  }};
`;

export const ComFightingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${({ anime }) => {
    if (anime === "stop") return "none";
    if (anime === "left")
      return css`
        ${moveLeft} 1s forwards
      `;
    if (anime === "right")
      return css`
        ${moveRight} 1s forwards
      `;
    if (anime === "halfLeft")
      return css`
        ${moveHalfLeft} 1s forwards
      `;
    if (anime === "halfRight")
      return css`
        ${moveHalfRight} 1s forwards
      `;
    return "none";
  }};
`;

const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-200px);
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
    transform: translateX(200px);
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
    transform: translateX(-100px);
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
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
`;
