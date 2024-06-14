import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './MovieList';
import Header from './Header';
import Modal from './Modal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNowPlaying, setIsNowPlaying] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsNowPlaying(false);
  };

  const handleNowPlayingClick = () => {
    setSearchQuery('');
    setIsNowPlaying(true);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header onSearch={handleSearch} onNowPlayingClick={handleNowPlayingClick} setSort={setSort}/>
      </header>
      <div className="App-content">
        <MovieList searchQuery={searchQuery} isNowPlaying={isNowPlaying} onMovieClick={handleMovieClick} sort={sort}  />
        <footer>
      <b>© Created by Ahemed Summer 2024</b></footer>
      </div>
      <Modal show={!!selectedMovie} onClose={closeModal} movie={selectedMovie} genres={genres} />
    </div>
  );
}

export default App;
