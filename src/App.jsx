import React,{ useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Header from './Header'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return(
    <div className="App">
      <Header onSearch={handleSearch}/>
      <MovieList searchQuery={searchQuery}/>
    </div>
  );
}

export default App;