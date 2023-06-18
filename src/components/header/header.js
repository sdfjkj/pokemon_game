import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  Container,
  LeftConainer,
  Logo,
  PageName,
  RightConainer,
  LoginContainer,
  Nav,
  StyledInput,
  StyledButton,
  Label,
} from "./styled";

function Header(props) {
  const location = useLocation();
  const pathWithoutSlash = props.currentPath.slice(1);
  const formattedPath = pathWithoutSlash.replace(/_/g, " ");
  const url = window.location.href;
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (username.trim().length === 0) {
      alert("유저명을 입력하세요.");
      return;
    }
  
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setIsLoggedIn(false);
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const logoClick = () => {
    if (location.pathname === "/Main") {
      window.location.reload();
    }
  };
  return (
    <Container>
      <LeftConainer>
        <Logo
          to="/Main"
          onClick={logoClick}
          src="https://lh3.googleusercontent.com/3TSaKxXGo2wT0lu0AyNUBnkk6wkCC2AzOhJyy3JXIPm-AmZ1k9DSAroWeBUyePswCZSs5lVp3mPF7HzUpY9VPlyOV5eddITONINr3WSqLNLm=e365-w512"
        />
        <PageName>{formattedPath}</PageName>
      </LeftConainer>
      <RightConainer>
        <Nav
          to="/Proposal"
          style={{
            color: url.includes("Proposal") ? "black" : "gray",
          }}
        >
          Report
        </Nav>
        <Nav
          to="/About_Us"
          style={{
            color: url.includes("About_Us") ? "black" : "gray",
          }}
        >
          About Us
        </Nav>
        {isLoggedIn ? (
          <LoginContainer>
            <Label>Welcome, {username}!</Label>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
          </LoginContainer>
        ) : (
          <LoginContainer>
            <StyledInput type="text" placeholder="Username" onChange={handleChange}  maxLength={5}/>
            <StyledButton onClick={handleLogin}>Login</StyledButton>
          </LoginContainer>
        )}
      </RightConainer>
    </Container>
  );
}

export default Header;
