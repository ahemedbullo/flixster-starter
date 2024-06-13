import React,{ useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Header from './Header'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNowPlaying, setIsNowPlaying]=useState(true);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsNowPlaying(false);
  };

  const handleNowPlayingClick = () => {
     setSearchQuery('');  // Reset the search query to fetch now playing movies
    setIsNowPlaying(true);
    console.log('is now playing')
  };

  return(
    <div className="App">
      <Header onSearch={handleSearch} onNowPlayingClick={handleNowPlayingClick}/>
      <MovieList searchQuery={searchQuery} isNowPlaying={isNowPlaying}/>
    </div>
  );
}

export default App;