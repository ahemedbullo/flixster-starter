import React,{ useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Header from './Header'

const App = () => {

  return(
    <div className="App">
      <Header/>
      <MovieList/>
    </div>
  );
}

export default App;