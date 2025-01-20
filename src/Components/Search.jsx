// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Card from './Card';
// import Navbar from './Navbar';

// async function fetchMoviesBySearch(query) {
//   try {
//     const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=803386cc`);
//     const data = await response.json();
//     console.log('Searched data',data)
//     return data.Search || []; 
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     return [];
//   }
// }

// function Search() {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get('query');
//   const [moviedata, setmoviedata] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true); 
//       if (query) {
//         const results = await fetchMoviesBySearch(query);
//         setmoviedata(results); 
//         console.log('Results',results)
//       }
//       setLoading(false); 
//     };

//     fetchMovies();
//   }, [query]);

//   return (
//     <>
//       <div className="About-navbar">
//         <Navbar />
//       </div>
//       <div className="search-results-container">
//         {loading ? (
//           <p>Loading search results...</p>
//         ) : moviedata.length > 0 ? (
//           <div className="grid-container">
//             {moviedata.map((moviedata, index) => (
//               <Card key={index} moviedata={moviedata} />
//             ))}
//           </div>
//         ) : (
//           <p>No movies found for "{query}".</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default Search;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import Navbar from './Navbar';

// Fetch basic search results by query
async function fetchMoviesBySearch(query) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=803386cc`);
    const data = await response.json();
    console.log('Searched data', data);
    return data.Search || []; // Return search results or an empty array
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

// Fetch detailed movie information using imdbID
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=803386cc`);
    const data = await response.json();
    return data; // Return detailed movie information
  } catch (error) {
    console.error(`Error fetching details for movie ID ${imdbID}:`, error);
    return null;
  }
}

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); 
  const [moviedata, setmoviedata] = useState([]); 
  const [loading, setLoading] = useState(true); 

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
        console.log('Detailed Results:', detailedMovies);
      }
      setLoading(false); 
    };

    fetchMovies();
  }, [query]);

  return (
    <>
      <div className="About-navbar">
        <Navbar />
      </div>
      <div className="search-results-container">
        {loading ? (
          <p>Loading search results...</p>
        ) : moviedata.length > 0 ? (
          <div className="grid-container">
            {moviedata.map((movie, index) => (
              <Card key={index} moviedata={movie} />
            ))}
          </div>
        ) : (
          <p>No movies found for "{query}".</p>
        )}
      </div>
    </>
  );
}

export default Search;
