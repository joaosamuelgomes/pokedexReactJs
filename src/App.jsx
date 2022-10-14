import React, {useEffect, useState} from 'react';
import { getPokemons, getPokemonData, searchPokemon } from './api';
import './App.css'
import Navbar from './components/Navbar'
import Pokedex  from './components/Pokedex'
import Searchbar from './components/Searchbar'
import { FavoriteProvider } from './contexts/favoritesContext';

const favoritesKey = "f";

function App() {
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);
	const [pokemons, setPokemons] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [notfound, setNotFound] = useState(false);

	const itensPerPage = 27;

	const fetchPokemons = async () => {
		try{
			setLoading(true);
			setNotFound(false);
			const data = await getPokemons(itensPerPage, itensPerPage * page);
			const promises = data.results.map(async (pokemon) => {
				return await getPokemonData(pokemon.url)
			});
			const results = await Promise.all(promises);
			setPokemons(results);
			setTotalPages(Math.ceil(data.count / itensPerPage));
			setLoading(false);

		} catch (error) {
			console.log("fetchPokemonsError: ", error);
		}
		
	}

	const loadFavoritePokemons = () => {
		const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
		setFavorites(pokemons);
	}

	useEffect(() => {
		fetchPokemons()
	}, [page])

	useEffect(() => {
		loadFavoritePokemons()
	}, [])

	const updateFavoritePokemons = (name) => {
		const updatedFavorites = [...favorites];
		const favoriteIndex = favorites.indexOf(name);
		if(favoriteIndex >= 0){
			updatedFavorites.splice(favoriteIndex, 1);
		} else {
			updatedFavorites.push(name);
		}
		window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
		setFavorites(updatedFavorites);
	}

	const onSearchHandler = async (pokemon) => {
		if (!pokemon) {
			return fetchPokemons();
		}

		setLoading(true);
		setNotFound(false);
		const result = await searchPokemon(pokemon)
		if (!result) {
			setNotFound(true)
		} else {
			setPokemons([result])
			setPage(0)
			setTotalPages(1)
		}
		setLoading(false)
	}

	return (
		<FavoriteProvider 
			value={{
				favoritePokemons: favorites,
				updateFavoritePokemons: updateFavoritePokemons
			}}
		>
			<div>
				<Navbar onSearchHandler={onSearchHandler}/>
				{notfound ? (<div className='not-found-text'>Não encontrado.</div>) : (
					<Pokedex 
						pokemons={pokemons} 
						loading={loading}
						page={page}
						setPage={setPage}
						totalPages={totalPages}
					/>
				)}
			</div>
		</FavoriteProvider>
	)
}

export default App
