import './CharacterGame.css';
import {Progress, Card} from 'antd';
import {useEffect, useState} from 'react'
import axios from "axios";
import { resolvePath } from 'react-router';

// 배열로 선언할 이유가 없음 -> 각 문제가 넘어갈 때마다 모든 정보를 가져올거기 때문에 그래서 정수값으로 사용
const COUNT =4;

function CharacterGame() {
    const [index, setIndex] = useState(0);
    const [start, setStart] = useState(false);

    // 이 state 값은 변하면 해당 부분만 렌더링 -> 이미지 정보를 불러오면 해당 src만 렌더링
    const [mypokemon, setMypokemon] = useState({
        name: [],
        url: [],
    });
        
    // useEffect(()=>{  
    //         const response = axios.get(
    //             `https://pokeapi.co/api/v2/pokemon/25`
    //         );
    //         response.then(result=>{
    //             setMypokemonURL(result.data.sprites.front_default);
    //         },[])
    //     }
    // )
    
    useEffect(()=>{
        const randomIdList = [];

        // 1부터 1010까지의 랜덤한 값을 4개 가져오는 알고리즘
        // 복권 알고리즘 : 1~45 까지의 랜덤한 값을 '중복되지 않게' 가져오는 알고리즘
        while (randomIdList.length < 4) {
            var num = parseInt(Math.random() * 1010 + 1);
            if (randomIdList.indexOf(num) == -1) {
                randomIdList.push(num);
            }
        }

        // 중복되지 않은 4개의 아이디 값으로 포켓몬 프로미스 객체를 가져오기
        const a = fetch(`https://pokeapi.co/api/v2/pokemon/${randomIdList[0]}`).then(res=>res.json())
        const b = fetch(`https://pokeapi.co/api/v2/pokemon/${randomIdList[1]}`).then(res=>res.json())
        const c = fetch(`https://pokeapi.co/api/v2/pokemon/${randomIdList[2]}`).then(res=>res.json())
        const d = fetch(`https://pokeapi.co/api/v2/pokemon/${randomIdList[3]}`).then(res=>res.json())

        while (randomIdList.length < 4) {
            var num = parseInt(Math.random() * 1010 + 1);
            if (randomIdList.indexOf(num) == -1) {
                randomIdList.push(num);
            }
        }
        // 4개의 프로미스 객체가 끝나면 호출되는 Promise.all을 사용
        Promise.all([a,b,c,d]).then(pokemons =>{
            setMypokemon({
                name: [pokemons[0].name, pokemons[1].name, pokemons[2].name, pokemons[3].name],
                url:[pokemons[0].sprites.front_default, pokemons[1].sprites.front_default, pokemons[2].sprites.front_default, pokemons[3].sprites.front_default]
            });
        })
    },[index]) // testpage는 index값이 바뀔때마다 또한 이미지 정보를 가져오는 것도 index 값이 바뀔때마다 호출


    const FirstPage = ()=>{
        
        return <div className='testpage' style={{backgroundColor: "white"}}><button className="teststart" onClick={()=>{
            setStart(true);
        }}>start</button></div>
    }

    const TestPage = () =>{
        // while (CharacterNumber.length < 4) {
        //     var num = parseInt(Math.random() * 4);
        //     if (CharacterNumber.indexOf(num) == -1) {
        //         CharacterNumber.push(num);
        //     }
        // }

        const btnList = ()=>{
            const randomNameList = [];

            // 0부터 3까지의 랜덤한 값을 4개 가져오는 알고리즘
            // 복권 알고리즘 : 1~45 까지의 랜덤한 값을 '중복되지 않게' 가져오는 알고리즘
            while (randomNameList.length < 4) {
                var num = parseInt(Math.random() * 4 );
                if (randomNameList.indexOf(num) == -1) {
                    randomNameList.push(num);
                }
            }

            // mypokemon.name = ["a", "b", "c", "d"]
            return mypokemon.name.map((name, idx)=>{

                return <button key={idx} onClick={()=>{
                    if(randomNameList[idx] === 0){
                        console.log('정답!')
                    }
                    setIndex(index+1)
                    }} 
                    style={{width: '120px', height: '90px', margin: '5px', fontSize:'20px'}}>
                        {mypokemon.name[randomNameList[idx]]}
                </button>
            })
        }

        return <div className='testpage' style={{position: 'relative'}}>
            <div style={{width: '400px', height: '300px', overflow: 'hidden', position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                {/* <img alt="example" src={mypokemon.url[0]} width={400} height={300} /> */}

                <Card 
                    hoverable
                    style={{
                    
                    }}
                    cover={<img alt="example" src={mypokemon.url[0]} width={400} height={300} />}
                >
                
                
                </Card>

            </div>
            <div style={{width: '10px', height: "285px"}}></div>

            <Progress
                percent={((index+1) / (COUNT))*100}
                style={{margin:'0 0 30px 0'}}
                strokeColor={{
                    '0%': 'rgb(254, 254, 207)',
                    '100%': '#108ee9',
                }}
                showInfo={false}
            />

            {/* 캐릭터 이름 버튼 4개가 연달아 나오는 부분 */}
            {btnList()}
            <div style={{marginTop: '100px'}}>{index+1} / {COUNT}</div>
        </div>
    }

    return <div>
        {!start ?  <FirstPage></FirstPage> :( index === COUNT ? "" : <TestPage></TestPage> )}
        
    </div>
}

export default CharacterGame;