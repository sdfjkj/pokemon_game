import styled from "styled-components";

export const Container = styled.div`
  background-color: #fffaef;
  margin-top: 40px;
  height: 300px;
  width: 100%;
  padding: 0px 150px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
export const FooterContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 180px;
  width:600px;
`;

export const FooterContentLayoutContainer= styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
`;

export const FooterContent = styled.div`
  width:300px;
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  font-style: italic;
  color: rgb(72, 72, 72);
`;
