import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, movie, genres }) => {
  if (!show || !movie) {
    return null;
  }

  const {
    runtime = 'N/A',
    backdrop_path = '',
    release_date = 'N/A',
    genre_ids = [],
    overview = 'No overview available',
    title = 'Untitled'
  } = movie;

  const getGenreNames = (genreIds) => {
    const genreNames = [];
    for (let id of genreIds) {
      const genre = genres.find(genre => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      }
    }
    return genreNames.join(', ');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{title}</h2>
       
          <img
            src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
            alt="Backdrop"
            className="modal-backdrop"
          />
       
        <p><strong>Runtime:</strong> {runtime} minutes</p>
        <p><strong>Release Date:</strong> {release_date}</p>
        <p><strong>Genres:</strong> {getGenreNames(genre_ids)}</p>
        <p><strong>Overview:</strong> {overview}</p>
      </div>
    </div>
  );
};

export default Modal;
