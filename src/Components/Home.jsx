import React, { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Card from "./Card";
import Navbar from "./Navbar";

async function fetchmoviedetails(imdbID) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=803386cc`
    );
    const data = await response.json();
    // console.log("Parsed data", data);
    return data;
  } catch (error) {
    console.log("error in fetching data", error);
    return null;
  }
}

export default function Home() {
  const [moviedata, setmoviedata] = useState([]);
  // const startID = 2123451;
  // const numberOfMovies = 10;
  const imdbIDs = [
    // Mission: Impossible Series
    "tt0117060", // Mission: Impossible (1996)
    "tt0120755", // Mission: Impossible II (2000)
    "tt0317919", // Mission: Impossible III (2006)
    "tt1229238", // Mission: Impossible – Ghost Protocol (2011)
    "tt2381249", // Mission: Impossible – Rogue Nation (2015)
    "tt4912910", // Mission: Impossible – Fallout (2018)
    "tt9603212", // Mission: Impossible – Dead Reckoning Part One (2023)

    // Harry Potter Series
    "tt0241527", // Harry Potter and the Sorcerer's Stone (2001)
    "tt0295297", // Harry Potter and the Chamber of Secrets (2002)
    "tt0304141", // Harry Potter and the Prisoner of Azkaban (2004)
    "tt0330373", // Harry Potter and the Goblet of Fire (2005)
    "tt0373889", // Harry Potter and the Order of the Phoenix (2007)
    "tt0417741", // Harry Potter and the Half-Blood Prince (2009)
    "tt0926084", // Harry Potter and the Deathly Hallows: Part 1 (2010)
    "tt1201607", // Harry Potter and the Deathly Hallows: Part 2 (2011)

    // Additional 30 Popular Movies
    "tt0111161", // The Shawshank Redemption (1994)
    "tt0068646", // The Godfather (1972)
    "tt0468569", // The Dark Knight (2008)
    "tt0071562", // The Godfather Part II (1974)
    "tt0050083", // 12 Angry Men (1957)
    "tt0108052", // Schindler's List (1993)
    "tt0167260", // The Lord of the Rings: The Return of the King (2003)
    "tt0110912", // Pulp Fiction (1994)
    "tt0060196", // The Good, the Bad and the Ugly (1966)
    "tt0137523", // Fight Club (1999)
    "tt0120737", // The Lord of the Rings: The Fellowship of the Ring (2001)
    "tt0109830", // Forrest Gump (1994)
    "tt1375666", // Inception (2010)
    "tt0167261", // The Lord of the Rings: The Two Towers (2002)
    "tt0080684", // Star Wars: Episode V - The Empire Strikes Back (1980)
    "tt0133093", // The Matrix (1999)
    "tt0099685", // Goodfellas (1990)
    "tt0073486", // One Flew Over the Cuckoo's Nest (1975)
    "tt0047478", // Seven Samurai (1954)
    "tt0114369", // Se7en (1995)
    "tt0102926", // The Silence of the Lambs (1991)
    "tt0317248", // City of God (2002)
    "tt0118799", // Life Is Beautiful (1997)
    "tt0114814", // The Usual Suspects (1995)
    "tt0110413", // Léon: The Professional (1994)
    "tt0245429", // Spirited Away (2001)
    "tt0120815", // Saving Private Ryan (1998)
    "tt0120689", // The Green Mile (1999)
    "tt0816692", // Interstellar (2014)
    "tt0110357", // The Lion King (1994)
  ];

  // for(let i=0;i<numberOfMovies;i++)
  // {y
  //     const id=`tt${startID+i}`;
  //     imdbIDs.push(id);
  // }

  useEffect(() => {
    const fetchallmovies = async () => {
      const fetchedmoviesdata = [];
      for (const id of imdbIDs) {
        try {
          const movie = await fetchmoviedetails(id);
          if (movie) fetchedmoviesdata.push(movie);
        } catch (error) {
          console.error(`Error in loading data of film ${id}`, error);
        }
      }
      setmoviedata(fetchedmoviesdata);
    };
    fetchallmovies();
  }, []);

  return (
    <>
    <div className='About-navbar'>    
      <Navbar/>
      </div>
      <div className="grid-container">
        {moviedata.length > 0 ? (
          moviedata.map((moviedata, index) => (
            <Card key={index} moviedata={moviedata} />
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </>
  );
}
