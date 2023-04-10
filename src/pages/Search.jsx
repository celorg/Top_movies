import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";

const Search = () => {

  const [searchParam] = useSearchParams();

  const [movies, setMovies] = useState([]);

  const query = searchParam.get("q");

  const getSearchMovies = async (url) => {

    const res = await fetch(url)
        .then((res) => res.json())
        .catch((err) => err)

    setMovies(res.results);

  }

  useEffect(() => {
      
      const searchWithQueryUrl = `${searchUrl}?api_key=${apiKey}&query=${query}&language=pt-BR`;

      getSearchMovies(searchWithQueryUrl);

  },[query])

  console.log(movies);

  return (
    <div className='container'>
        <h2 className='title'>Resultados para : <span className='query-text'>{query}</span></h2>
        <div className="movies-container">
            {movies.length === 0 && <p>Carregando...</p>}
            {movies.length > 0 && movies.map((movie) => 
                <MovieCard movie={movie} key={movie.id}/>
            )}
        </div>
    </div>
  )
}

export default Search