import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  

  return (
    <>
      <div className="navbar-dummy"></div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Mynmovies</h1>
        </div>
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </>
  );
}

export default Navbar;
