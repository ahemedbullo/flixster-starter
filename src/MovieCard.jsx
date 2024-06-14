import React,{ useState } from "react";
import PropTypes from "prop-types";
import './MovieCard.css';

function MovieCard({ image, title, rating, movie, onClick }) {
   const [liked, setLiked] = useState(false);

   const handleLikeClick = (event) => {
    console.log(liked)
    event.stopPropagation();
    setLiked(!liked);
};
   
  return (
    <div className="MovieCard" onClick={() => onClick(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500${image}`} alt="" />
      <p>{title}</p>
      <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>&#9829;</button>
      <p>{rating.toFixed(1)}</p>
    </div>
  );
}

MovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;
