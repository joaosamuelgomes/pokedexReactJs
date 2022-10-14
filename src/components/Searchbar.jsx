import React, {useState} from "react";
import { searchPokemon } from "../api";

const Searchbar = (props) => {
    const {onSearchHandler} = props;
    const [search, setSearch] = useState("pikachu");
    const [pokemon, setPokemon] = useState();

    const onChangeInput = (e) => {
        setSearch(e.target.value);
        if(e.target.value.length === 0) {
            onSearchHandler(undefined);
        }
    }

    const onButtonClick = () => {
        onSearchHandler(search);
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Procurar Pokémon" onChange={onChangeInput}/>
            </div>
            <div className="searchbar-button">
                <button onClick={onButtonClick}>Buscar</button>
            </div>
        </div>
    );
};

export default Searchbar;