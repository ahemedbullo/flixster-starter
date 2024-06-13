import React, { useState, useEffect } from "react";
import MovieList from './MovieList'
import './Header.css'

const Header = ({ onSearch, onNowPlayingClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        onSearch(searchQuery);
      }
    };
  
    return (
      <div className="Header">
        <h1 className="header-title">Flixter</h1>
        <div className="search-container">
        <input 
          type="search" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
         onKeyPress={handleKeyPress} 
          placeholder="Search Movies"
          className="search-input"
        />
        <button className="search-button" onClick={() => onSearch(searchQuery)}>Search</button>
        <button className="now-playing-button" onClick={onNowPlayingClick}>Now Playing</button>
      </div>
      </div>
    );
  };
  
  export default Header;