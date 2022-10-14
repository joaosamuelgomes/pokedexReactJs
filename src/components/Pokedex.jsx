import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {

    const { pokemons, loading, page, totalPages, setPage} = props;

    const onPrevClickHandler = () => {
        if (page > 0) {
            setPage(page-1)
        }
    }

    const onNextClickHandler = () => {
        if (page+1 !==totalPages) {
            setPage(page+1)
        }
    }
    
    return (
        <div>
            <div className="pokedex-header">
                <Pagination 
                    page={page+1} 
                    totalPages={totalPages} 
                    onPrevClick={onPrevClickHandler} 
                    onNextClick={onNextClickHandler}
                />
            </div>
            {loading ? (<div className="pokedex-carregando-msg">Carregando...</div>) : (<div className="pokedex-grid">{pokemons && pokemons.map((pokemon, index) => { return <Pokemon key={index} pokemon={pokemon}/> })}</div>)}
        </div>
    );
};

export default Pokedex;