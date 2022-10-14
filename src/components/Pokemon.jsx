import { useContext } from "react";
import React from "react";
import FavoriteContext from "../contexts/favoritesContext";

const Pokemon = (props) => {
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext);
    const {pokemon} = props;
    const blackHeart = <span className="black-heart-icon">❤</span>;
    const redHeart = <span className="red-heart-icon">❤</span>;
    const heart = <div>{favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart}</div>

    const onFavClick = () => {
        updateFavoritePokemons(pokemon.name)
    }

    return (
        <div className="pokemon-card">
            <div className="pokemon-image-container">
                <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-image" />
            </div>
            <div className="card-body">
                <div className="card-top">
                    <h3>{pokemon.name}</h3>
                    <div># {pokemon.id}</div>
                </div>
                <div className="card-bottom">
                    <div className="pokemon-type">
                        {pokemon.types.map((type, index) => {
                            return (
                                <div key={index} className="pokemon-type-text">{type.type.name}</div>
                            )
                        })}
                    </div>
                    <button className="pokemon-fav-button" onClick={onFavClick}>{heart}</button>
                </div>
            </div>
        </div>
    )
}

export default Pokemon;