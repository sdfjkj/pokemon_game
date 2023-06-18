/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../../storage/actions";
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
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if (user.id !== null) {
      setUsername(user.id);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (username.trim().length === 0) {
      alert("유저명을 입력하세요.");
      return;
    }
    dispatch(setId(username));
    setIsLoggedIn(true);
    navigate("/Main");
  };

  const handleLogout = () => {
    setUsername("");
    dispatch(setId(null));
    setIsLoggedIn(false);
    navigate("/Main");
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const logoClick = () => {
    if (location.pathname === "/Main") {
      window.scrollTo(0, 0);
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
            <StyledInput
              type="text"
              placeholder="Username"
              onChange={handleChange}
              maxLength={5}
            />
            <StyledButton onClick={handleLogin}>Login</StyledButton>
          </LoginContainer>
        )}
      </RightConainer>
    </Container>
  );
}

export default Header;
