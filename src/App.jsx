import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return(
    <div className="App">
      <form id="form">
        <input 
          type="search" 
          id="query" 
          name="q" 
          placeholder="" 
          value={searchQuery} 
          onChange={handleSearchInputChange} 
        />
        <button type="submit">Search</button>
      </form>
      <MovieList searchQuery={searchQuery} />
    </div>
  );
}

export default App;