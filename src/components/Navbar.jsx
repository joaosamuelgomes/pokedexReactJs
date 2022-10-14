import React, {useContext} from "react";
import FavoriteContext from "../contexts/favoritesContext";
import Searchbar from "./Searchbar";
import gitCat from "../assets/favicons/gitHub-mark-32x.png";

const Navbar = (props) =>{
    const {onSearchHandler} = props;
    const {favoritePokemons} = useContext(FavoriteContext);

    const onClickGitImage = () => {
        window.open("https://github.com/joaosamuelgomes");
    }

    return (
        <nav className="navbar-container">
            <div className="navbar-title-container">
                <h1>Pokédex</h1>
                <img src={gitCat} onClick={onClickGitImage}></img>
            </div>
            <div className="navbar-favorites-number">
                {favoritePokemons.length} ❤ {favoritePokemons.length>1 ? <span>favoritos</span> : <span>favorito</span>}
            </div>
            <Searchbar onSearchHandler={onSearchHandler}/>
        </nav>
    );
};

export default Navbar;