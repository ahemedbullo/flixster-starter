/* 
This component will act like a container. It will be the foundation for displaying a whole list of movies (search results, "now playing" movies, etc.). Its job might include:

    Fetching movie data from the TMDb API
    Looping through the fetched data and creating a MovieCard component for each individual movie
    Arranging all the MovieCard components nicely on the scree
 */
import React, {useEffect,useState}from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard";
import './MovieList.css'

function MovieList({ searchQuery }){
    const [movies, setMovies] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false);
    

    const fetchMovies = async ()=>{
        console.log('Search Query:', searchQuery); // Check the search query value
        const apiKey= import.meta.env.VITE_API_KEY
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNum}`;
        if (searchQuery) {
            url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNum}&query=${encodeURIComponent(searchQuery)}`;
          }
          console.log('API Request URL:', url);
        const response = await fetch(url);
        const data = await response.json()
        console.log('API Response:', data);
        setMovies(data.results)
        console.log(data)
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        console.log('Movies State:', movies);
        setLoading(false);
    }

    useEffect(() => {
        fetchMovies()
    }, [pageNum, searchQuery])

    const handleLoadMore = () => {
        setLoading(true);
        setPageNum(pageNum + 1);
      };

    let loadMoreButton;
        if (loading) {loadMoreButton = <p>Loading...</p>;} 
        else {
        loadMoreButton = <button onClick={handleLoadMore}>Load More</button>;
}

    return(
        <div className="movie-list">
            {movies && movies.map(movie => (
                <div key={`${movie.id}-${Math.random()}`}>
                    <MovieCard image={movie.poster_path} title={movie.original_title} rating={movie.vote_average} />
                </div>
            ))}
            {loadMoreButton}

        </div>
    )

}

export default MovieList;