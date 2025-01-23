import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import Navbar from "./Navbar";
import "../App.css"

async function fetchMoviesBySearch(query) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${query}&apikey=803386cc`
    );
    const data = await response.json();
    console.log("Searched data", data);
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=803386cc`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${imdbID}:`, error);
    return null;
  }
}

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [moviedata, setmoviedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage]=useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      if (query) {
        const searchResults = await fetchMoviesBySearch(query);

        const detailedMovies = await Promise.all(
          searchResults.map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return details;
          })
        );

        setmoviedata(detailedMovies);
        console.log("Detailed Results:", detailedMovies);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [query]);

  const totalPages=Math.ceil(moviedata.length/3);

  const handlePrevpage=()=>{
    if(page>1) setPage(page-1);
  }
  const handleNextpage=()=>{
    if(page<totalPages)setPage(page+1);
  }

  return (
    <>
      <div className="About-navbar">
        <Navbar />
      </div>
      <div className="search-results-container">
        {loading ? (
          <p>Loading search results...</p>
        ) : moviedata.length > 0 ? (
          <>
          <div className="grid-container">
            {moviedata.slice(page*3-3,page*3).map((movie, index) => (
              <Card key={index} moviedata={movie} />
            ))}
          </div>
          <div className="pagination">
            <button
            disabled={page===1}
            onClick={handlePrevpage}

            >Prevoius</button>
            <span>Page {page} of {totalPages}</span>
            <button
            onClick={handleNextpage}
            disabled={page===totalPages}
            >Next</button>
          </div>
          </>

        ) : (
          <p>No movies found for "{query}".</p>
        )}
        
      </div>
  
    </>
  );
}

export default Search;
