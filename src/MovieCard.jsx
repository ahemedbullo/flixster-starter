import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";

function MovieCard({ image, title, rating, movie, onClick }) {
  const [liked, setLiked] = useState(false);
  const [watched, setWatched] = useState(false);

  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLiked(!liked);
  };
  const handleWatched = (event) => {
    event.stopPropagation();
    setWatched(!watched);
  };

  return (
    <div className="MovieCard" onClick={() => onClick(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500${image}`} alt="" />
      <p>{title}</p>
      <div className="liked-watched">
        <input type="checkbox" className="checkbox" onClick={handleWatched} />
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={handleLikeClick}
        >
          &#9829;
        </button>
      </div>
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
