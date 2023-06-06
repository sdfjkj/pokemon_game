import {React, useState} from 'react'
import {Progress, Card, Spin,Result, AutoComplete} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './MBTI.css';
import axios from "axios";
import pokenmon_ball from './pokenmon_ball.png';
                // ISTJ : 387 //1
                // ISFJ : 447 //2
                // INFJ :3
                // INTJ :4
                // ISTP :5
                // ISFP :6
                // INFP :7
                // INTP :8
                // ESTP :9
                // ESFP :10
                // ENFP :255 //11
                // ENTP :252 //12
                // ESTJ :7 //13
                // ESFJ :258 //14
                // ENFJ :25 //15
                // ENTJ :4 //16

                // infj 치코리타 152
                // intj 델빌 228
                // istp 이상해씨 1
                // isfp 펭도리 393
                // infp 랄토스 280
                // intp 브케인 155
                // estp 불꽃숭이 390
                // esfp 리아코 158


const mbti=[0,0,0,0];
const query = [
    [
        {
            question : ["혼자 여행을 가기로해서 숙소를 잡았다. 그 숙소는?","E/I-1"],
            answer1 : ["사람들과 함께 묶을 수 있는 게스트 하우스", "E"],
            answer2 : ["나 혼자만의 공간인 호텔","I"]
        },
        {
            question : ["비도 오고 마음도 우중충하고 심심하다 그럴때 나는?","E/I-2"],
            answer1 : ['아무나 불러서 술먹고 논다.',"E"],
            answer2 : ["집에서 혼술과 TV를 본다","I"]
        },
        {
            question : ["오랜만에 내가 맛있는 과자를 발견했을때 나는?","E/I-3"],
            answer1 : ["가족, 친구, 지인에게 소개한다.","E"],
            answer2 : ["그냥 나만 사서 잘 먹는다","I"]
        },
    ],

    [
        {
            question : ["나에게 5000만원이 생겼다. 내가 투자할 주식 종목은?","S/N-1"],
            answer1 : ["안전제일 코카콜라는 안망하지!! 코카콜라!","S"],
            answer2 : ["조만간 자동차는 전기차로 전부 바뀔거야 테슬라!!","N"]
        },
        {
            question : ["내가 생각하는 미래는?","S/N-2"],
            answer1 : ["현재가 없으면 미래가 없다","S"],
            answer2 : ["미래를 생각하지 않으면 발전이 없다","N"]
        },
        {
            question : ["첫 회사에 출근 후 친구가 회사에 대해 물어볼 때 나는?","S/N-3"],
            answer1 : ["전체적인 회사에 분위기를 말한다.","S"],
            answer2 : ["구체적으로 오늘 있었던 일들을 나열한다","N"]
        },
    ],

    [
        {
            question : ["친구가 중요한 주식정보를 주었다. 나의 행동은?","F/T-1"],
            answer1 : ["믿을만한 친구니까 친구따라 가즈아","F"],
            answer2 : ["그 회사는 내가 모르는 회사니까 패스","T"]
        },
        {
            question : ["친구가 준비한 시험에서 떨어졌다. 당신의 행동은?","F/T-2"],
            answer1 : ["수고했다! 술이나 먹자!","F"],
            answer2 : ["왜?? 무슨 문제 있었어? 컨디션이 별루였나보네...","T"]
        },
        {
            question : ["회사에 입사하게 되었을 때 내가 들어가고 싶은 팀은?","F/T-3"],
            answer1 : ["회사내에서 가장 신뢰받고 인망이 좋은 팀","F"],
            answer2 : ["회사내에 성과가 좋고, 영향력이 있는 팀","T"]
        },
    ],

    [
        {
            question : ["친구가 갑자기 여행을 가자고 한다 나의 행동?","P/J-1"],
            answer1 : ["오케이! 여행은 즉흥이지!","P"],
            answer2 : ["어디가는데?? 필요한 물건은 ? 비용은?","J"]
        },
        {
            question : ["첫 소개팅 하는날! 나는 무슨 옷을 입을 것인가?","P/J-2"],
            answer1 : ["오늘은 너로 정했다! 그날 끌리는 옷!","P"],
            answer2 : ["이미 어제 준비해놨지!","J"],
        },
        {
            question : ["여행중 계획된 장소가 아닌 장소를 지나가게 됬다. 나의 행동은?","P/J-3"],
            answer1 : ["일정에 무리가 있어도 궁금하면 가본다.","P"],
            answer2 : ["일정에 무리가 있으면 포기하고 일정대로 행동한다.","J"]
        },
    ],

]


const TestPage = ({idx,setIdx}) =>{
    // console.log(query[idx].question);


    const i = parseInt(idx / 3)
    const j = idx % 3
    

    return <div className='testpage'>
        <h4>{query[i][j].question[0]}</h4>
        <p><button className="selectButton" onClick={()=>{
            if(idx<query.length*3){
                // console.log(query[i][j].answer1[1])
                setIdx(idx+1)
                mbti[i]++;
                

            }
        }}>{query[i][j].answer1[0]}</button></p>

        <button className="selectButton" onClick={()=>{
            if(idx<query.length*3){
                setIdx(idx+1)
                // console.log(query[i][j].answer2[1])
                mbti[i]--;
            }
        }}>{query[i][j].answer2[0]}</button>
        <Progress
            percent={((idx+1) / (query.length*3))*100}
            style={{marginTop:'20px'}}
            strokeColor={{
                '0%': 'rgb(254, 254, 207)',
                '100%': '#108ee9',
            }}
            showInfo={false}
        />
        <div>{idx+1} / {query.length*3}</div>
        <br></br>
        <button className="mbtiTestGobackButton" onClick={()=>{
            if(idx>0){setIdx(idx-1)}
            }}>뒤로</button>
    </div>
}


const MBTI = () => {
    const [index, setIndex] = useState(0);
    const [start, setStart] = useState(false);
    const [mypokemonURL, setMypokemonURL] = useState("");
    let resultMBTI="";

    const FirstPage = ()=>{
        return <div className='testpage' style={{backgroundColor: "white"}}><button className="teststart" onClick={()=>{
            setStart(true);
        }}>start</button></div>
    }

    const ResultPage = ()=>{
        if(mbti[0] > 0){
            if(mbti[1] > 0){
                if(mbti[2] > 0){resultMBTI = (mbti[3] > 0)? "ESFP-158-리아코" : "ESFJ-258-물짱이"}
                else{resultMBTI = (mbti[3] > 0)? "ESTP-390-불꽃숭이" : "ESTJ-7-꼬부기"}
            }
            else{
                if(mbti[2] > 0){resultMBTI = (mbti[3] > 0)? "ENFP-255-아차모" : "ENFJ-25-피카츄"}
                else{resultMBTI = (mbti[3] > 0)? "ENTP-252-나무지기" : "ENTJ-4-파이리"}
            }
        }
        else{
            if(mbti[1] > 0){
                if(mbti[2] > 0){resultMBTI = (mbti[3] > 0)? "ISFP-393-펭도리" : "ISFJ-447-리오르"}
                else{resultMBTI = (mbti[3] > 0)? "ISTP-1-이상해씨" : "ISTJ-387-모부기"}
            }
            else{
                if(mbti[2] > 0){resultMBTI = (mbti[3] > 0)? "INFP-280-랄토스" : "INFJ-152-치코리타"}
                else{resultMBTI = (mbti[3] > 0)? "INTP-155-브케인" : "INTJ-228-델빌"}
            }

        }
        const pokemonInfo = resultMBTI.split('-')
        const response = axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonInfo[1]}`
        );
        response.then(result=>setTimeout(() => {
            setMypokemonURL(result.data.sprites.front_default)
        }, 300));
            
        const antIcon = (
            <LoadingOutlined
                style={{
                    fontSize: 24,
                }}
                spin
                />
            );
        const { Meta } = Card;
        return (
            <div>
                {/* <img src={mypokemonURL} width={300} height={300} /> */}
                {/* <h3>{pokemonInfo[0]}</h3> */}
            <div className='flip'>
                <div className='card'>
                    <div className="front">
                    <Card className='mbtiResultCard'
                            hoverable
                            style={{
                            width: 240,
                            marginTop: 150,
                            marginBottom: 10,
                            }}
                    >
                        
                        <div>
                            
                            <div className='pokemon_ball'>
                                <div className='shadow'></div>
                                <img alt="example" src={pokenmon_ball} width={100} height={100}/>
                            </div>
                        </div>
                        <div style={{margin: 50}}>hover</div>
                        </Card>
                    </div>
                    <div className="back">
                        <Card className='mbtiResultCard'
                            hoverable
                            style={{
                            width: 240,
                            marginTop: 150,
                            marginBottom: 10,
                            }}
                            cover={<img alt="example" src={mypokemonURL} width={400} height={300} />}
                        >
                            <div className='mbtiResultCardText'>
                                <h1 style={{margin:0}}>{pokemonInfo[0]}</h1>
                                <a href='https://pokemon.fandom.com/wiki/Pok%C3%A9mon_Wiki'><h3>{pokemonInfo[2]}</h3></a>
                                <a href =''><h4>{pokemonInfo[0]}에 대해 더 알고 싶다면?</h4></a>
                                {/* <Meta title="" description="https://pokemon.fandom.com/wiki/Pok%C3%A9mon_Wiki" /> */}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>


            </div>
            
        )
    }

    return <div>
            {!start ?  <FirstPage></FirstPage> :( index === query.length*3 ? <ResultPage></ResultPage> : <TestPage idx={index} setIdx={setIndex}></TestPage> )}
        </div>
    
}
export default MBTI;