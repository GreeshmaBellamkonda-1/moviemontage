import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import moviesData from '../../moviesData';
import './MovieList.css';
import MightAlsoSearchFor from '../MightAlsoSearchFor/MightAlsoSearchFor';

const MovieList = () => {
  const [movies, setMovies] = useState(moviesData.slice(0, 4));

  useEffect(() => {
    // Use the real movie data
    setMovies(moviesData);
  }, []);

  return (
    <div className="movie-list">
      <div className="HomeDiv">
        <div className="DarkOverlayM">
          <div className="movie-container">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <MightAlsoSearchFor />
        </div>
      </div>
    </div>
  );
};

export default MovieList;




  
