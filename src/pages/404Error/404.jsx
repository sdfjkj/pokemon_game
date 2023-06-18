
import React from 'react';
import styled, { keyframes } from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  background-color : white;
  z-index  : 1000;
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  animation: ${float} 3s ease-in-out infinite;
`;


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Content = styled.div`
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;



const ErrorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const rotateIn = keyframes`
  from {
    transform: rotate(-360deg);
  }
  to {
    transform: rotate(0);
  }
`;

const Title = styled.h1`
  font-size: 120px;
  color: #333;
  margin: 0;
  animation: ${rotateIn} 1s ease-out;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Subtitle = styled.h2`
  font-size: 36px;
  color: #666;
  margin: 20px 0;
  animation: ${slideIn} 1s ease-out;
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const Message = styled.p`
  font-size: 18px;
  color: #999;
  margin: 0;
  animation: ${scaleIn} 1s ease-out;
`;



const HomeLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  animation: ${fadeIn} 1s ease-out;
`;

const Error = () => {
  return (
    <PageContainer>
      <Content>
        <ImageWrapper>
          <ErrorImage src="https://pokemon.itple.co.kr/public/img/pokemon/7.webp" alt="404 이미지" />
        </ImageWrapper>
        <Title>404</Title>
        <Subtitle>페이지를 찾을 수 없음</Subtitle>
        <Message>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</Message>
        <HomeLink href="/">홈으로 돌아가기</HomeLink>
      </Content>
    </PageContainer>
  );
};

export default Error;
