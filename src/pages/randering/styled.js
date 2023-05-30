
import styled from "styled-components";
import { Link } from "react-router-dom";

export const RanderingPage = styled.div`
  margin-top: 150px;
  width: 1020px;
  height: 600px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://www.arealme.com/cover-images/which-pokemon-should-i-use.png);
    background-size: cover;
    opacity: 0.5;
  }
`;

export const ButtonContainer = styled.div`
  position: relative;
  top: 10px;
  display: flex;
  justify-content: space-around;
  width: 800px;
`;

export const Zenigame = styled.img`
  position: relative;
  bottom: 30px;
  left: 140px;
  width: 310px;
  margin: 20px;
`;

export const StyledLink = styled(Link)`
  background-color: rgb(24, 24, 159);
  width: 190px;
  text-align: center;
  color: yellow;
  font-size: 32px;
  border-radius: 20px;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: bold;
  font-style: italic;
  border-bottom: 1px solid rgb(112, 112, 112);
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.4);
`;
