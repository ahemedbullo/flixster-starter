import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import './MovieList.css';

function MovieList({ searchQuery, isNowPlaying, onMovieClick, sort }) { //passing in props
const [movies, setMovies] = useState([]); //initializing list for movies to be appended to
const [pageNum, setPageNum] = useState(1); //initializng page to 1 so when calling the API for the first time it gets those movies from page 1
const [loading, setLoading] = useState(false); //initializing the loading which changes to "loading" when I click load more
const [prevSearchQuery, setPrevSearchQuery] = useState(''); //holds the previous search query when I search something else new
const [prevIsNowPlaying, setPrevIsNowPlaying] = useState(isNowPlaying); //holds the now playing or the previous nowPlaying


const fetchMovies = async (reset = false) => { //just sets the default to reset
const apiKey = import.meta.env.VITE_API_KEY; //api key
let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNum}`;

if (!isNowPlaying && searchQuery !== '') {
url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${pageNum}&query=${encodeURIComponent(searchQuery)}`; //api end point when searching
}
if (sort){
console.log(sort);
url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}&query=${encodeURIComponent(searchQuery)}&sort_by=${sort}.desc`
console.log(url)
}


const response = await fetch(url);
console.log(response)
const data = await response.json();
console.log(data)

if (reset) { //this checks if I am now search for a new movie if so just gives me the result or data of the new search
setMovies(data.results); //this sets the movie displayed to the new search result
} else {
setMovies(prevMovies => [...prevMovies, ...data.results]); //if not a new search and I'm either loading more it appends more movies to be displayed
}
setLoading(false); //and changes it from loading back to Load More as the new movies have already loaded
};

useEffect(() => { //as the effect of a new search
console.log('hello')
if (searchQuery !== prevSearchQuery ) { //checking if the new searchquery is the same as the previous one
setPageNum(1); //sets it to the first page
setPrevSearchQuery(searchQuery); //setting the previous search when I do a new search say I say 'Home' first and then search 'Book', 'Home' is stored there
//setPrevIsNowPlaying(isNowPlaying);
fetchMovies(true); // Reset movies on new search or mode change and new data is fetched to display(so displays only the new searched items)

}
else if(sort) {
setPageNum(1);
fetchMovies(true);

} else {
console.log('wrong')
fetchMovies(); //just fetches more data
}
}, [pageNum, searchQuery, isNowPlaying, sort]); //this is based on if the state of these are changed

const handleLoadMore = () => {
setLoading(true); //when I click load more it changes from load more to "loading"
setPageNum(pageNum + 1); //page gets incremented so I could get data of that page
};

return (
<div>
<div className="movie-list">
{movies && movies.map(movie => ( //if there is data in movies it goes through the list of movies and creates a new card per movie
<div key={`${movie.id}-${Math.random()}`}> {/* id of the movie */}

<MovieCard /* for every movie it passes this data in */
image={movie.poster_path}
title={movie.title}
rating={movie.vote_average}
movie={movie} /* Passes each Movie and it's information as a prop*/
onClick={onMovieClick} /* OnClick prop is passed so when the movie card is clicked*/
/>
</div>
))}
</div>
<div className="load-more">
{loading ? <p>Loading...</p> : <button onClick={handleLoadMore}>Load More</button>} {/* handles load more */}
</div>
</div>
);
}

export default MovieList;