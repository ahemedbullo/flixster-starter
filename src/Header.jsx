import React, { useState, useEffect } from "react";
import MovieList from './MovieList'

const Header = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        onSearch(searchQuery);
      }
    };
  
    return (
      <div className="Header">
        <h1>Flixter</h1>
        <input 
          type="search" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
         onKeyPress={handleKeyPress} 
          placeholder="Search Movies"
        />
        <button onClick={() => onSearch(searchQuery)}>Search</button>
      </div>
    );
  };
  
  export default Header;