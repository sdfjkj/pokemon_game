import React from "react";
import {
  Container,
  CardContainer,
  Info,
  CardText,
  InfoContainer,
} from "./styled";

export const MainCardSection = (props) => {
  return (
    <Container colorKey={props.id}>
      <CardContainer to={props.route} src={props.src}>
        <CardText>{props.name}</CardText>
      </CardContainer>
      <InfoContainer>
        <Info>{props.name}</Info>
        <Info>{props.discription}</Info>
        <Info>{props.detail1}</Info>
        <Info>{props.detail2}</Info>
      </InfoContainer>
    </Container>
  );
};
