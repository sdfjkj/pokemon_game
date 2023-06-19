import React, { useState, useEffect, useCallback} from "react";
import "./PokewikiDetails.css";
import axios from 'axios';
import { useLocation } from "react-router-dom";

function PokewikiDetails(){
    const location = useLocation();
	const index = location.state.index;

    const [data, setData] = useState({
        results:[],forms:[{name:""}],
        types: [{"type":{"name":""}}],
        abilities: [{"ability":{"name":""}}],
        stats: []
    });

    const Getapi = async() => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`+String(location.state.index)+'/');
      setData(response.data);
    }
    useEffect(() => {Getapi()}, []);

    const getTypeColor = (type) => {
        switch (type) {
          case "grass":
            return "green";
          case "poison":
            return "purple";
          case "fire":
            return "red";
          case "water":
            return "blue";
          case "bug":
            return "lime";
          case "flying":
            return "lightblue";
          case "normal":
            return "gray";
          case "ground":
            return "brown";
          case "fairy":
            return "pink";
          case "psychic":
            return "hotpink";
          case "fighting":
            return "darkred";
          case "electric":
            return "yellow";
          case "steel":
            return "darkblue";
          case "dragon":
            return "navy";
          default:
            return "default";
        }
    };
    
    const renderStatsTable = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>능력치</th>
                        <th>값</th>
                    </tr>
                </thead>
                <tbody>
                    {data.stats.map((stat, index) => (
                        <tr key={index}>
                            <td>{stat.stat.name}</td>
                            <td>{stat.base_stat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return(
        <div class="body">
            <div class="box">
                <div class="img_wrap">
                    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+String(index)+".png"}></img>
                </div>
                <div>
                    <p>{data.forms[0].name}</p>
                    <p>No.{index}</p>
                    <p>Type:</p>
                    <div className="button-group">
                        {data.types.map((item, index) => (
                            <button
                                key={index}
                                className={`type-button ${getTypeColor(item.type.name)}`}
                                disabled
                            >
                                {item.type.name}
                            </button>
                        ))}
                    </div>
                    <p>Skills:</p>
                    <div className="button-group">
                        {data.abilities.map((item, index) => (
                            <button key={index} className="type-button">{item.ability.name}</button>
                        ))}
                    </div>
                    <p>Stats:</p>
                    {renderStatsTable()}
                </div>
            </div>
        </div>
    );
};

export default PokewikiDetails