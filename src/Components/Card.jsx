import React from 'react';
import { Link } from 'react-router';

function Card({ moviedata }) {
  return (
    <>

    <Link to={`/movie/${moviedata.imdbID}`} className="card-link">
    <div className="card">
      {moviedata ? (
        <div>
  
          <img
            src={moviedata.Poster}
            alt={`${moviedata.Title} Poster`}
            className="card-poster"
          />

       
          <h2 className="card-title">{moviedata.Title}</h2>

         
          <div className="card-details">
            <div className="column">
              <p><strong>Director:</strong> {moviedata.Director}</p>
              <p><strong>Release Date:</strong> {moviedata.Released}</p>
            </div>
            <div className="column">
              <p><strong>Runtime:</strong> {moviedata.Runtime}</p>
              <p><strong>Rating:</strong> {moviedata.imdbRating}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </Link>
    </>
  );
}

export default Card;
