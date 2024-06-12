import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import './MovieCard.css'


/* 
This component is the blueprint for how a single movie should be displayed. It will likely contain elements to show:
    The movie's title
    The movie's poster image
    The movie's vote average or rating
 */


    function MovieCard(props){
        return(
            <div className="MovieCard">
                <img src="{props.image}" alt=""/>
                <p>{props.title}</p>
                <p>{props.rating}</p>
            </div>
        );

    }
    MovieCard.propTypes = {
        image:PropTypes.any,
        title: PropTypes.string,
        rating: PropTypes.number,
    }
    export default MovieCard;
