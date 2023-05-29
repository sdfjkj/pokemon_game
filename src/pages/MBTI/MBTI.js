import {React, useState} from 'react'
import {Progress} from 'antd';
import './MBTI.css';

const query = [
    {
        question : "약속이 있어 밖에 나왔을 때 주로 내 모습은?",
        answer1 : "집갈래",
        answer2 : "벌써 간다고?"
    },
    {
        question : "애인에게 화가 났을 때 나는?",
        answer1 : "침묵",
        answer2 : "왜 화가 났는지 바로 이야기"
    },
    {
        question : "대화 중 정적이 흐르면?",
        answer1 : "눈치보면서 기다림",
        answer2 : "아무 말 대잔치"
    },
    {
        question : "만나기로 했던 애인이 오늘따라 피곤하다고 한다면?",
        answer1 : "무슨 뜻일까?",
        answer2 : "오늘 쉴래?"
    },
    {
        question : "카페에서 음료를 들고 계단을 오르고 있다. 이때 드는 내 생각은?",
        answer1 : "넘어지면 어쩌지",
        answer2 : "마시자"
    },
    {
        question : "연애 초기에 많이 하는 생각은?",
        answer1 : "오래 가자!",
        answer2 : "오래 갈 수 있을까?"
    }
]


const TestPage = ({idx,setIdx}) =>{
    // console.log(query[idx].question);
    return <div className='testpage'>
        <h4>{query[idx].question}</h4>
        <p><button className="selectButton" onClick={()=>{
            if(idx<query.length){setIdx(idx+1)}
        }}>{query[idx].answer1}</button></p>
        <button className="selectButton" onClick={()=>{
            if(idx<query.length){setIdx(idx+1)}
        }}>{query[idx].answer2}</button>
        <Progress
            percent={((idx+1) / query.length)*100}
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
            }}
            showInfo={false}
        />
        
        <div>{idx+1} / {query.length}</div>
        <br></br>
        <button onClick={()=>{
            if(idx>0){setIdx(idx-1)}
            }}>뒤로</button>
    </div>
}

const MBTI = () => {
    const [index, setIndex] = useState(0);
    const [start, setStart] = useState(false);

    const FirstPage = ()=>{
        return <div className='testpage' style={{backgroundColor: "#ccc"}}><button className="teststart" onClick={()=>{
            setStart(true);
        }}>start</button></div>
    }

    const ResultPage = ()=>{
        return (
            <div className='testpage'>
                <p>끝</p>
            </div>
        )
    }

    return <div>
            {!start ?  <FirstPage></FirstPage> :( index === query.length ? <ResultPage></ResultPage> : <TestPage idx={index} setIdx={setIndex}></TestPage> )}
        </div>
    
}
export default MBTI;