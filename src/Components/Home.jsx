import React, { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import Card from "./Card";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

async function fetchmoviedetails(imdbID) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=803386cc`
    );
  
    const data = await response.json();
    console.log("Parsed data", data);
    // if(data && data.response === "true")
    return data;
  } catch (error) {
    console.log("error in fetching data", error);
    return null;
  }
}


export default function Home() {
  const [moviedata, setmoviedata] = useState([]);
  const [loading,setLoading] = useState(false);
  const [currentID,setCurrentID] = useState(1201607);
  const navigate = useNavigate();

  // These two are to fetch the details manually and fetch from the array 
  // const imdbIDs = [
  //   // Mission: Impossible Series
  //   "tt0117060", "tt0120755", "tt0317919", "tt1229238", "tt2381249",
  //   "tt4912910", "tt9603212",
  //   // Harry Potter Series
  //   "tt0241527", "tt0295297", "tt0304141", "tt0330373", "tt0373889",
  //   "tt0417741", "tt0926084", "tt1201607",
  //   // Additional 30 Popular Movies
  //   "tt0111161", "tt0068646", "tt0468569", "tt0071562", "tt0050083",
  //   "tt0108052", "tt0167260", "tt0110912", "tt0060196", "tt0137523",
  //   "tt0120737", "tt0109830", "tt1375666", "tt0167261", "tt0080684",
  //   "tt0133093", "tt0099685", "tt0073486", "tt0047478", "tt0114369",
  //   "tt0102926", "tt0317248", "tt0118799", "tt0114814", "tt0110413",
  //   "tt0245429", "tt0120815", "tt0120689", "tt0816692", "tt0110357",
  // ];
  
  // useEffect(() => {
  //   const fetchallmovies = async () => {
  //     const fetchedmoviesdata = [];
  //     for (const id of imdbIDs) {
  //       try {
  //         const movie = await fetchmoviedetails(id);
  //         if (movie) fetchedmoviesdata.push(movie);
  //       } catch (error) {
  //         console.error(`Error in loading data of film ${id}`, error);
  //       }
  //     }
  //     setmoviedata(fetchedmoviesdata);
  //     setLoading(false);
  //   };
  //   fetchallmovies();
  // }, []);

  const fetchMoviesbyBatch = async(startID,count)=>{
    const movies=[];
    let id=startID;
    while(movies.length<count)
    {
      const movie = await fetchmoviedetails(`tt${id}`);
      if (movie && movie.Response === "True" && movie.Poster && movie.Poster !== "N/A") {
        movies.push(movie);
      }
      id++;
    }
    return {movies,nextID:id};

  }
  useEffect(()=>{
    const fetchInitialMovies = async()=>{
      setLoading(true)
      const {movies,nextID} = await fetchMoviesbyBatch(currentID,10);


      setmoviedata(movies);
      console.log(moviedata)
      setCurrentID(nextID);
      setLoading(false);
    };
    fetchInitialMovies();

  },[])

  const handleScroll = async()=>{
    if(document.body.scrollHeight-300<window.innerHeight+window.scrollY)
    {
      setLoading(true);
      const {movies,nextID}=await fetchMoviesbyBatch(currentID,10);
      setmoviedata((prev)=>[...prev,...movies]);
      setCurrentID(nextID);
      setLoading(false);
      
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentID]);




  // window.addEventListener("scroll",handleScroll);
  //   const handleScroll = ()=>{
  //     if(document.body.scrollHeight-300 < window.scrollY+window.innerHeight){
  //       setLoading(true);
  //     }
  //   }


  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    navigate("/"); 

    
};


  return (
    <>
      <div className="About-navbar">
        <Navbar />
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
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
