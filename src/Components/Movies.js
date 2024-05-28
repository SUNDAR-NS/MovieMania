import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=85dd9bc4f9357a1c05adda90616fa0cd&language=en-US&page=1')
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      });
  }, []);

  return (
    <div className="movies-container">
      <div className="trending-movies-title">
        Trending movies
      </div>
      <div className="movie-list">
        {movies.map((movieObj, index) => (
          <MovieCard key={index} poster_path={movieObj.poster_path} name={movieObj.original_title} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
