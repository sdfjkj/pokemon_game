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
        <Link to="/main" className="button">
          Play Now
        </Link>
        <Link to="/main" className="button">
          Find Partner
        </Link>
      </div>
    </div>
  );
}
