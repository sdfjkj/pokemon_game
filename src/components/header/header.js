import React from "react";
import { useLocation } from "react-router";
import {
  Container,
  LeftConainer,
  Logo,
  PageName,
  RightConainer,
  Nav,
} from "./styled";

function Header(props) {
  const location = useLocation();
  const pathWithoutSlash = props.currentPath.slice(1);
  const formattedPath = pathWithoutSlash.replace(/_/g, " ");
  const url = window.location.href;
  const logoClick =()=>{
    if(location.pathname === "/Main"){
      window.scrollTo(0, 0);
    }
  }
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


      </RightConainer>
    </Container>
  );
}

export default Header;
