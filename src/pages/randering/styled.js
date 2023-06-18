import styled, { keyframes, css } from "styled-components";

export const RanderingPage = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 400px;
  background-image: url(https://camo.githubusercontent.com/90f24316b24433bf0a2778d95ca93ad264093645a71d2eb9f569cdbc34fbfc6d/68747470733a2f2f6372797374616c2d63646e322e6372797374616c636f6d6d657263652e636f6d2f70686f746f732f363333303536352f73706c61736842616e6e65725f706f6b656d6f6e2e6a7067);
  background-repeat: no-repeat;
  opacity: 0.6;
  background-size: cover;
`;

const move = keyframes`
  0% { 
    transform: translateX(0) translateY(0) rotate(0deg) scale(1); 
  }
  25% { 
    transform: translateX(700px) translateY(0) rotate(45deg) scale(1.1); 
  }
  50% { 
    transform: translateX(700px) translateY(0) rotate(90deg) scale(1); 
  }
  75% { 
    transform: translateX(0) translateY(0) rotate(-45deg) scale(0.5); 
  }
  100% { 
    transform: translateX(0) translateY(0) rotate(0deg) scale(1); 
  }
`;

export const ZenigameContainer = styled.div`
  position: absolute;
  transform: rotate(-8deg);
  top: 150px;
  left: 430px;
  margin: 20px;
  animation: ${(props) =>
    props.move &&
    css`
      ${move} 8s infinite linear
    `};
`;

export const Talk = styled.div`
  font-size: 20px;
  background-color: white;
  border-radius: 10px;
  font-weight: bold;
  padding: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  text-align: center;
  width:50%;
`;
export const Zenigame = styled.img`
  width: 310px;
`;
