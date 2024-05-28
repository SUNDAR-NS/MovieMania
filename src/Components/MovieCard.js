import React from 'react';

function MovieCard({ poster_path, name }) {
  return (
    <div className="moviecard" style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/' + poster_path + ')' }}>
      <div>
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
