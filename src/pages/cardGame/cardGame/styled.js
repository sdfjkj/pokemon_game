import styled from "styled-components";
import { Spin } from "antd";



export const LobbyPage = styled.div`
  margin-top: 110px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("https://media.istockphoto.com/id/1333215671/vector/locker-room-of-fitness-club-or-gym-with-cabinets-and-bench.jpg?s=612x612&w=0&k=20&c=wJzqCxmVNP0AwixWD3Mc2Mfy_92ARf86sB2vv0tMbBc=");

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
export const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin-top: 30px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(to bottom right, #d8fff9, #c0ffbe);
  width: 250px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  padding: 15px 0px;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 800px;
  margin-bottom: 20px;
`;

export const SettingButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  text-align: center;
  letter-spacing: 2px;
  padding: 10px 30px;
  font-size: 20px;
  line-height: 30px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background: linear-gradient(to bottom right, #ff5f6d, #ffc371);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to bottom right, #5fffbc, #71cbff);
  }
`;

export const StartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 150px;
  padding: 20px 20px;
  text-align: center;
  font-size: 20px;
  line-height: 23px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background: linear-gradient(to bottom right, #ff5f6d, #ffc371);
  transition: all 0.3s ease;

  ${(props) =>
    props.isDisabled &&
    `
  cursor: not-allowed;
  color: black;
  background: white;`}

  &:hover {
    background: linear-gradient(to bottom right, #5fffbc, #71cbff);
  }
`;
export const ContentsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  width: 900px;
  margin-bottom: 10px;
`;

export const SelectContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 580px;
  background-color: #f5f5f5;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  padding: 30px 30px;
  border-radius: 15px;
`;

export const MessageBox = styled.div`
  width: 400px;
  height:70px;
  display: flex;
  padding: 5px 20px;
  margin-top: 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 40px;
  font-size: 20px;
  font-style: italic;
  line-height: 30px;
  border-radius: 10px;
  color: white;
  background: linear-gradient(to bottom right, #6e7cff, #b6b2e4);
  transition: all 0.3s ease;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 402px;
`;

export const CardBox = styled.div`
  border: 1px solid black;
  width: 160px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    `
  background-color: #c3fac4;
  
    
`}
`;

export const CardText = styled.div`
  font-weight: bold;
  margin: 5px 0px;
`;

export const SelectedPokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  background-color: white;
  width: 200px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
`;

export const SelectedCardText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 5px 0px 30px 0px;
  font-style: italic;
`;

export const MySpin = styled(Spin)`


`;