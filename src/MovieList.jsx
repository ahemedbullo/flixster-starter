import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import './MovieList.css';

function MovieList({ searchQuery, isNowPlaying, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [prevIsNowPlaying, setPrevIsNowPlaying] = useState(isNowPlaying);

  const fetchMovies = async (reset = false) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNum}`;

    if (!isNowPlaying && searchQuery !== '') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${pageNum}&query=${encodeURIComponent(searchQuery)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    if (reset) {
      setMovies(data.results);
    } else {
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery !== prevSearchQuery || isNowPlaying !== prevIsNowPlaying) {
      setPageNum(1);
      setPrevSearchQuery(searchQuery);
      setPrevIsNowPlaying(isNowPlaying);
      fetchMovies(true); // Reset movies on new search or mode change
    } else {
      fetchMovies();
    }
  }, [pageNum, searchQuery, isNowPlaying]);

  const handleLoadMore = () => {
    setLoading(true);
    setPageNum(pageNum + 1);
  };

  return (
    <div>
      <div className="movie-list">
        {movies && movies.map(movie => (
          <div key={`${movie.id}-${Math.random()}`}>
            <MovieCard
              image={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              movie={movie}
              onClick={onMovieClick}
            />
          </div>
        ))}
      </div>
      <div className="load-more">
        {loading ? <p>Loading...</p> : <button onClick={handleLoadMore}>Load More</button>}
      </div>
    </div>
  );
}

export default MovieList;
