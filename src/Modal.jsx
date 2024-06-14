import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ show, onClose, movie, genres }) => {
  //passing in those props from different components

  const [trailerUrl, setTrailerUrl] = useState("");
  const getModalVideo = async (movieId) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const trailer = data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
    setTrailerUrl(trailerUrl);
  };

  useEffect(() => {
    if (movie) {
      getModalVideo(movie.id);
    }
  }, [movie]);

  if (!show || !movie) {
    //if I am not picking to show or if there are no movies there would be no modal
    return null;
  }

  const {
    // these are the props for the modal data that I will be using to render those items
    backdrop_path = "",
    release_date = "N/A",
    genre_ids = [], //list of genre Id' I have to get name for
    overview = "No overview available",
    title = "Untitled",
  } = movie;
  /* 
getGenreNames is passed in genre ids for the movie I select a modal for 
and from that it checks if that genre exists in the list of genres and it appends it to the genreNames initialized before the loop
  */

  const getGenreNames = (genreIds) => {
    const genreNames = [];
    for (let id of genreIds) {
      const genre = genres.find((genre) => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      }
    }
    return genreNames.join(", ");
  };
  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleModalClick}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt="Backdrop"
          className="modal-backdrop"
        />
        <p>
          <strong>Release Date:</strong> {release_date}
        </p>
        <p>
          <strong>Genres:</strong> {getGenreNames(genre_ids)}
        </p>{" "}
        {/* sends the ids for the movies and gets back the list with the name of genres */}
        <p>
          <strong>Overview:</strong> {overview}
        </p>
        <iframe
          className="trailer-video"
          src={trailerUrl}
          allow="accelerometer;; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width="600"
          height="500"
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;
