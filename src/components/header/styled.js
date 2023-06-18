import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
  z-index: 2;
  position: fixed;
  box-sizing: border-box;
  height: 100px;
  padding: 0px 170px;
  background-color:white;
`;

export const LeftConainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(Link).attrs((props) => ({
}))`
  display: inline-block;
  width: 110px;
  height: 100px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right:100px;
`;

export const PageName = styled.div`
  font-size: 20px;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  font-size:35px;
  font-weight:bold;
  color:#5E82FF;
  letter-spacing: 2px;
  font-style:italic;
`;

export const RightConainer = styled.div`
  display: flex;
  align-items: center;
`;



export const Nav = styled(Link)`
  font-size:20px;
  margin-right:40px;
  &:hover {
    text-decoration: underline;
    color: white;
  }
`;

export const LoginContainer = styled.div`
  display : flex;
  align-items: center;
  justify-content: flex-end;
  width: 270px;
`;

export const Label = styled.div`
  font-size: 20px;
  font-weight: bold;
  color:#575757;
`;

export const StyledButton = styled.button`
  background-color: #72A9FF;
  color: white;
  padding:4px 15px;
  font-size:17px;
  border:none;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin-left:20px;
  letter-spacing: 2px;
  cursor: pointer;
  width:90px;

`;
export const StyledInput = styled.input`
  width:100px;
  font-size:17px;
  padding: 2px 3px;
  text-align:center;
`;