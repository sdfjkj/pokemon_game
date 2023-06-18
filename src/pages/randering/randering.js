import { React, useState, useEffect } from "react";
import {
  RanderingPage,
  Banner,
  ZenigameContainer,
  Zenigame,
  Talk,
} from "./styled";
import { MainCardSection } from "../../components/mainCard/cardSection";

export const Randering = () => {
  const functiondata = [
    {
      name: "Card Game",
      discription: "카드게임을 통해 포켓몬을 만나보세요!",
      detail1: "랜덤으로 포켓몬을 뽑아 강한 상대방과 대결!",
      detail2: "약한 포켓몬을 뽑아도 전략만 잘 짜면 이길 수 있어요!",
      src: "https://2.bp.blogspot.com/-YNPdLQywtW4/W8wueuzNkrI/AAAAAAAAAOY/lrahfc22fLs2AMr068cnPvVGYenr-_8XACLcBGAs/s1600/99E493345AE78EF20E.gif",
      route: "/Card_Game",
    },
    {
      name: "Poke MBTI",
      discription: "포켓몬으로 알아보는 MBTI",
      detail1: "ㅁㄴㅇㄹ",
      detail2: "ㅁㄴㅇㄹ",
      src: "https://media.tenor.com/8Vo82I74B38AAAAC/cute-pokemon.gif",
      route: "/MBTI",
    },
    {
      name: "Poke Wiki",
      discription: "포켓몬에 대해 알아보세요!",
      detail1: "ㅁㄴㅇㄹ",
      detail2: "ㅁㄴㅇㄹ",
      src: "https://i.chzbgr.com/full/8525634816/h561129EB/pokemon-memes-raichu-gif",
      route: "/a",
    },
    {
      name: "Poke Game",
      discription: "포켓몬 캐릭터에 대해 알아보세요!",
      detail1: "ㅁㄴㅇㄹ",
      detail2: "ㅁㄴㅇㄹ",
      src: "",
      route: "/CharacterGame",
    },
  ];
  const [move, setMove] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {

      setMove(!move);
  }, [message]);

  return (
    <RanderingPage>
      <Banner />
      <ZenigameContainer move={move} >
        {message && <Talk>Help!!</Talk>}
        <Zenigame
          src="https://pokemon.itple.co.kr/public/img/pokemon/7.webp"
          alt="img2"
          onClick={() => {
            if(message === null){
              setMessage("안녕하세요");
            }
            else{
              setMessage(null);
            }
            
          }}
        />
      </ZenigameContainer>
      {/* <p>{message}</p> */}
      {functiondata.map((data, index) => {
        return (
          <MainCardSection
            name={data.name}
            discription={data.discription}
            detail1={data.detail1}
            detail2={data.detail2}
            src={data.src}
            route={data.route}
            id={index}
            key={index}
          />
        );
      })}
    </RanderingPage>
  );
};
