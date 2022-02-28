import {useState, useEffect} from 'react';
import PokemonThumb from './components/PokemonThumb'


function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=39');


  const getAllPokemons = async () => {
    const res = await fetch(loadMore) 
    const data = await res.json();
    setLoadMore(data.next)
    
    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data]);
      })
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }

  useEffect(() => {
    getAllPokemons()
   }, [])

  return (
    <div className="app-contaner ">
      <h1>Pokemon Evolution</h1>

      <div className="pokemon-container" >
      <div className ="all-container">
      {allPokemons.sort((a,b) =>  a-b).map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
      
      </div>
      <button className="load-more" onClick={() => getAllPokemons()}>Load more </button>
      </div>
    </div>
  );
}

export default App;
