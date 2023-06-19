import './CharacterGame.css';
import {Progress, } from 'antd';
import {useEffect, useState} from 'react'
import { Space, Table, Tag } from 'antd';



// 배열로 선언할 이유가 없음 -> 각 문제가 넘어갈 때마다 모든 정보를 가져올거기 때문에 그래서 정수값으로 사용
const COUNT =4;
const score = Array.from({length :COUNT},()=>0 )
const CharacterList = Array.from({length :COUNT},()=>{return {name: "", url: ""}})
// console.log(score)

const columns = [
        {
        title: 'CharacterName',
        dataIndex: 'CharacterName',
        key: 'CharacterName',
        render: (text) => <a target='_blank' href={`https://pokemon.fandom.com/wiki/${text}`}>{text}</a>,
        },
        {
            title: 'CharacterImg',
            dataIndex: 'CharacterImg',
            key: 'CharacterImg',
            render: (src) => <img src={src} />,
            },
        {
        title: 'answer',
        dataIndex: 'answer',
        key: 'answer',
        render : (s)=>{
            if(s>0){
                return "O"
            }
            else{
                return "X"
            }
        }
    },];



function CharacterGame() {
    const [index, setIndex] = useState(0);
    const [start, setStart] = useState(false);
    const [showStyle, setShowStyle] = useState({display:'none'});

    // 이 state 값은 변하면 해당 부분만 렌더링 -> 이미지 정보를 불러오면 해당 src만 렌더링
    const [mypokemon, setMypokemon] = useState({
        name: [],
        url: [],
    });

    const data = [
        {
        key: '1',
        CharacterName: CharacterList[0].name,
        CharacterImg: CharacterList[0].url,
        answer: score[0],
        },
        {
            key: '2',
            CharacterName:CharacterList[1].name,
            CharacterImg: CharacterList[1].url,
            answer: score[1],
        },
        {
            key: '3',
            CharacterName: CharacterList[2].name,
            CharacterImg: CharacterList[2].url,
            answer: score[2],
        },
        {
            key: '4',
            CharacterName: CharacterList[3].name,
            CharacterImg: CharacterList[3].url,
            answer: score[3],
        },
    ];
        
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
            if (index < COUNT){
                CharacterList[index].name = pokemons[0].name;
                CharacterList[index].url = pokemons[0].sprites.front_default;
            }

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
                        setShowStyle({display: 'none'})
                        alert('정답!')
                        score[index]=score[index]+1
                        setIndex(index+1)
                    
                    } else {
                        setShowStyle({display: 'block'})
                        alert(`오답! 정답은 ${mypokemon.name[0]}입니다! 정답을 다시 선택해주세요`)
                        score[index]=score[index]-2
                        
                    }
                    
                    
                    }} 
                    style={{width: '125px', height: '100px', margin: '5px', fontSize:'20px'}}>
                        {mypokemon.name[randomNameList[idx]]}
                </button>
            })
        }

        return <div className='testpage' >
                <img alt="example" src={mypokemon.url[0]} width={400} height={300} />
                
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
            
            <div className='fig-container' style={showStyle}>
                    <figure className='fig'><img src={mypokemon.url[0]} /><figcaption>{mypokemon.name[0]}</figcaption></figure>
                    <figure className='fig'><img src={mypokemon.url[1]} /><figcaption>{mypokemon.name[1]}</figcaption></figure>
                    <figure className='fig'><img src={mypokemon.url[2]} /><figcaption>{mypokemon.name[2]}</figcaption></figure>
                    <figure className='fig'><img src={mypokemon.url[3]} /><figcaption>{mypokemon.name[3]}</figcaption></figure>
                </div>
                <div style={{marginTop: '100px'}}>{index+1} / {COUNT}</div>
            </div>
    }

    const LastPage = () =>{
        



        return <div className='finalpage'>
            <Table columns={columns} dataSource={data} pagination={false} />

        </div>
    }

    return <div>
        {!start ?  <FirstPage></FirstPage> :( index === COUNT ? <LastPage></LastPage> : <TestPage></TestPage> )}
        
    </div>
}

export default CharacterGame;