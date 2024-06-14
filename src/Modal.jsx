import React, {useEffect, useState}from 'react';
import './Modal.css';

const Modal = ({ show, onClose, movie, genres }) => { //passing in those props from different components

  const [trailerUrl, setTrailerUrl] = useState('');

if (!show || !movie) { //if I am not picking to show or if there are no movies there would be no modal
    return null;
  }

  const { // these are the props for the modal data that I will be using to render those items
    backdrop_path = '',
    release_date = 'N/A',
    genre_ids = [], //list of genre Id' I have to get name for
    overview = 'No overview available',
    title = 'Untitled',
} = movie;
/* 
getGenreNames is passed in genre ids for the movie I select a modal for 
and from that it checks if that genre exists in the list of genres and it appends it to the genreNames initialized before the loop
  */

const getGenreNames = (genreIds) => { 
    const genreNames = [];
    for (let id of genreIds) {  //loops through the list given from the 
      const genre = genres.find(genre => genre.id === id); //genres is a list with a genre
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
        <p><strong>Release Date:</strong> {release_date}</p>
        <p><strong>Genres:</strong> {getGenreNames(genre_ids)}</p> {/* sends the ids for the movies and gets back the list with the name of genres */}
        <p><strong>Overview:</strong> {overview}</p>

        </div>
    </div>
);
};

export default Modal;
