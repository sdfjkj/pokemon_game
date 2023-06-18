import React from "react";
import { Container, CardContainer, CardText } from "./styled";

export const MainCardSection = (props) => {
  return (
    <Container colorKey={props.id}>
      
      <CardContainer to={props.route} src={props.src} >
        <CardText>{props.name}</CardText>
      </CardContainer>
    </Container>
  );
};
