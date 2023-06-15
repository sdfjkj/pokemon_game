import React from "react";
import {
  Container,
  FooterContentContainer,
  FooterContentLayoutContainer,
  FooterContent,
} from "./styled";

function Footer() {
  return (
    <Container>
      <FooterContentContainer>
        <FooterContentLayoutContainer>
          <FooterContent>Author:</FooterContent>
          <FooterContent> 강제구, 윤영서, 전현정</FooterContent>
        </FooterContentLayoutContainer>
        <FooterContentLayoutContainer>
          <FooterContent>API Refenece:</FooterContent>
          <FooterContent> pokeapi.co</FooterContent>
        </FooterContentLayoutContainer>
        <FooterContentLayoutContainer>
          <FooterContent>From: </FooterContent>
          <FooterContent>Dongguk University</FooterContent>
        </FooterContentLayoutContainer>
      </FooterContentContainer>
    </Container>
  );
}

export default Footer;
