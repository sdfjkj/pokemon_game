import React, { useState, useEffect, useCallback} from "react";
import "./Pokewiki.css";
import axios from 'axios';
import {Link} from "react-router-dom";

function Pokewiki(){

    

    const [data, setData] = useState({results:[{name:" "},{name:" "}]});

    const Getapi = async() => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`);
      setData(response.data);
    }
    useEffect(() => {Getapi()}, []);
    
    return (
    <div class="body">
      <button id="wiki_welcom">포켓몬 위키에 오신 것을 환영합니다!</button>
      <ul class="cardWrap">{data.results.map((pokeItem, index) => (
        <li class="card">
          <Link class="link" to={"/Pokewiki/"+String(index+1)} state={{index:index+1}}>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+String(index+1)+".png"}></img>
            <p class="cardText">No.{index+1}<br/>{pokeItem.name}</p>
          </Link>
        </li>))}
      </ul>
    </div>
    );
};

export default Pokewiki;