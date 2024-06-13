import React from "react";
import PropTypes from "prop-types";
import './MovieCard.css';

function MovieCard({ image, title, rating, movie, onClick }) {
  return (
    <div className="MovieCard" onClick={() => onClick(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500${image}`} alt="" />
      <p>{title}</p>
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
