import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../App.css';
import Navbar from './Navbar';


async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=803386cc`);
    return await response.json();
  } catch (error) {
    console.log(`Error loading movie details for ID: ${imdbID}`, error);
    return null;
  }
}

function About() {
  const { id } = useParams(); 
  const [movieData, setMovieData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovieDetails(id);
      setMovieData(data);
      setLoading(false); 
    };
    fetchData();
  }, [id]);

  return (
    <>
    <div className='About-navbar'>    
      <Navbar/>
      </div>
    <div className="movie-details-container">
      {loading ? (
        <p>Loading movie details...</p>
      ) : movieData ? (
        <div className="movie-details">
          <div >
            <img className="movie-poster"
              src={movieData.Poster}
              alt={`${movieData.Title} Poster`}
              // style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>

          <div className="movie-info">
            <h1>{movieData.Title}</h1>
            <p><strong>Year:</strong> {movieData.Year}</p>
            <p><strong>Released:</strong> {movieData.Released}</p>
            <p><strong>Runtime:</strong> {movieData.Runtime}</p>
            <p><strong>Director:</strong> {movieData.Director}</p>
            <p><strong>Writer:</strong> {movieData.Writer}</p>
            <p><strong>Actors:</strong> {movieData.Actors}</p>
            <p><strong>Genre:</strong> {movieData.Genre}</p>
            <p><strong>Plot:</strong> {movieData.Plot}</p>
            <p><strong>Awards:</strong> {movieData.Awards}</p>
            <p><strong>IMDb Rating:</strong> {movieData.imdbRating}</p>
          </div>
        </div>
      ) : (
        <p>Movie not found or an error occurred.</p>
      )}
    </div>
    

    </>
  );
}

export default About;
