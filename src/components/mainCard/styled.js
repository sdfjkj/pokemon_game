import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin-top: 30px;
  width: 90%;
  height: 430px;
  display: flex;
  align-items: center;
  background: ${(props) => {
    switch (props.colorKey) {
      case 0:
        return "linear-gradient(to left,  white, #E5FFED)"; // 엷은 녹색에서 진한 녹색으로
      case 1:
        return "linear-gradient(to right, white, #DCFFFE)"; // 터콰즈 색상에서 진한 터콰즈 색상으로
      case 2:
        return "linear-gradient(to top left, white, #C9FFCF, white)"; // 라임색에서 진한 라임색으로
      default:
        return "linear-gradient(to top left, #d8ffe4, #b3e6cc, white)"; // 기본값
    }
  }};
  transition: all 0.3s ease;
`;


export const CardContainer = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 330px;
  height: 330px;
  border-radius: 15px;
  margin-left: 200px;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.4);
  background-image: url(${(props) => props.src}});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to top left,
      rgba(216, 255, 228, 0.1),
      rgba(179, 230, 204, 0.1),
      rgba(255, 255, 255, 0.1)
    );
    border-radius: 15px;
    transition: all 0.3s ease;
  }

  &:hover {
    &::before {
      background: linear-gradient(to top left, #d8ffe4, #b3e6cc, white);
      background-image: url(https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      transition: all 0.3s ease;
    }
  }
`;

export const CardText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  position: relative;
  font-size: 32px;
  font-weight: bold;
  background-color: white;
  z-index: 1;
  padding: 4px 10px;
  border-radius: 10px;
  margin-top: 210px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
`;
