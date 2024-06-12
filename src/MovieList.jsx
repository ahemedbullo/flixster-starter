import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MovieCard from "./MovieCard";
import './MovieList.css'

function MovieList({ searchQuery }) {
    console.log("This is MovieList",searchQuery)

const [movies, setMovies] = useState([])
const [pageNum, setPageNum] = useState(1)
const [loading, setLoading] = useState(false)

const fetchMovies = async () => {

    const apiKey = import.meta.env.VITE_API_KEY
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNum}`
    if (searchQuery != '') {

    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${pageNum}&query=${encodeURIComponent(searchQuery)}`
    console.log('test')

}


    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
if(pageNum>1){
        setMovies((prevMovies) => {
            return [...prevMovies, ...data.results]
        })
    }
    else{
    setMovies(data.results)
    }
    setLoading(false)
}

useEffect(() => {
    fetchMovies()
}, [pageNum, searchQuery])

const handleLoadMore = () => {
    setLoading(true)
    setPageNum(pageNum + 1)
}

let loadMoreButton
    if (loading) {
    loadMoreButton = <p>Loading...</p>
} else {
    loadMoreButton = <button onClick={handleLoadMore}>Load More</button>
}
return (
    <div>
    <div className="movie-list">
        {movies && movies.map(movie => (
        <div key={`${movie.id}-${Math.random()}`}>
            <MovieCard image={movie.poster_path} title={movie.original_title} rating={movie.vote_average} />
        </div>
        ))}
    </div>
    <div className="load-more">
        {loadMoreButton}
    </div>
    </div>
)
}

export default MovieList;


