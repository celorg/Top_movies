import {useState, useEffect} from 'react'

//css
import './MovieGrid.css';

//Components
import MovieCard from '../components/MovieCard';

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY


const Home = () => {

    const [topMovies, setTopMovies] = useState([]);

    const getTopRateMovies = async (url) => {

        const res = await fetch(url)
            .then((res) => res.json())
            .catch((err) => err)

        setTopMovies(res.results);

    }

    useEffect(() => {
        
        const topRateUrl = `${moviesUrl}top_rated?api_key=${apiKey}&language=pt-BR`;

        getTopRateMovies(topRateUrl);

    },[])


  return (
    <div className='container'>
        <h2 className='title'>Melhores Filmes:</h2>
        <div className="movies-container">
            {topMovies.length === 0 && <p>Carregando...</p>}
            {topMovies.length > 0 && topMovies.map((movie) => 
                <MovieCard movie={movie} key={movie.id}/>
            )}
        </div>
    </div>
  )
}

export default Home