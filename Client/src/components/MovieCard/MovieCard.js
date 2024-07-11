// client/src/components/MovieCard.js
import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, onClick }) => {

  const navigate = useNavigate();

  const movieid=movie.id;

  console.log("movieidfomrcard",movieid);

  const imageName=movie.poster;

  const handleClick = () => {
    navigate('/moviepage', { state: { movieid:movieid } });
  };
  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={`./images/${imageName}`} alt={movie.title} className="movie-image" />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>Duration: {movie.duration} </p>
        <p>Average Stars: {movie.stars} ★</p>
        <p>Summary: {movie.summary}</p>
      </div>
    </div>
  );
};

export default MovieCard;
