import React from "react";
import { Link } from "react-router-dom";
import './randering.css'


export const Randering = () => {
  return (
    <div className="randering_page">
      <img src="https://pokemon.itple.co.kr/public/img/pokemon/7.webp" className="zenigame" alt="img2"/>
      <div className="button_container">
        <Link to="/main" className="button">
          Poke Wiki
        </Link>
        <Link to="/Card_Game" className="button">
          Card Game
        </Link>
        <Link to="/MBTI" className="button">
          Poke MBTI
        </Link>
      </div>
    </div>
  );
}
