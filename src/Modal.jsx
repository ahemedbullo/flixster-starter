import React from "react";
import './Modal.css'

const Modal = ({show, onClose, movie}) =>{
    if(!show){
        return null;
    }
const {
    runtime,
    release_date,
    genres,
    overview,
    title
}= movie;

return(
    <div className="modal-overlay">
        <div className="modal">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Title</h2>
            <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}alt="" className="modal-backdrop"/>
            <p>Runtime:{runtime}</p>
            <p>Release Date: {release_date}</p>
            <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>
            <p>Overview: {overview}</p>
        </div>

    </div>
)
    
}

export default Modal;