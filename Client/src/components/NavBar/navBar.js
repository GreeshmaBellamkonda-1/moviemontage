import React, { useEffect, useState } from 'react';
import './navBar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added import for useSelector

const Navbar = ({ filterData }) => {
  let flag = 1;
  let userId;
  const user = useSelector(state => state.user); // Assuming 'state.user' contains the user object

  if (user && user.user && user.user.uid) {
    userId = user.user.uid;
    console.log("userid", userId);
  } else {
    flag = 0;
  }

  const navigate = useNavigate();

  const [searchMovie, setSearchMovie] = useState("");

  const selectedFilters = {
    ratings: [],
    genres: [],
    movieTitle: "",
    superId: ""
  };

  const toggle = () => {
    // toggle 'show' class on mobile menu
    const mobileMenu = document.querySelector('.mobile-nav');
    mobileMenu.classList.toggle('show');
  };

  const toggleDropdown = () => {
    const dropdownContent = document.querySelector('.dropdown-content');
    const icon = document.getElementById('icon');

    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
      icon.style.transform = 'rotate(0deg)';
    } else {
      dropdownContent.style.display = 'block';
      icon.style.transform = 'rotate(180deg)';
    }
  };

  const handleApplyFiltersClick = async () => {
    document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked').forEach((checkbox) => {
      const category = checkbox.closest('.category').querySelector('span').innerText.toLowerCase();
      if (category === 'rating') {
        selectedFilters.ratings.push(checkbox.value);
      } else if (category === 'genre') {
        selectedFilters.genres.push(checkbox.value);
      }
    });

    // Perform search with the selected filters
    filterData(selectedFilters);

    // Close the dropdown after applying filters
    const dropdownContent = document.querySelector('.dropdown-content');
    const icon = document.getElementById('icon');
    dropdownContent.style.display = 'none';
    icon.style.transform = 'rotate(0deg)';
  };

  const handleSearchClick = () => {
    selectedFilters.movieTitle = searchMovie;
    selectedFilters.genres = [];
    selectedFilters.ratings = [];
    filterData(selectedFilters);
  };

  // useEffect(() => {
  //   handleApplyFiltersClick(); // This will execute once when component mounts
  // }, []);

  return (
    <nav className="navbar">
      {/* Navigation Content */}
      <div className="content">
        
        <div className="logo">
          <img src="moviemania.png" alt="logo" />
          <h2>MovieMania</h2>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop">
          <ul className="links">
            <li>
              <div className="searchbar">
                {/* Dropdown */}
                <div className="dropdown">
                  <div id="drop-text" className="dropdown-text" onClick={toggleDropdown}>
                    <span id="span">Filters </span>
                    <i id="icon" className="fa-solid fa-chevron-down" />
                  </div>
                  <div className="dropdown-content">
                    {/* Ratings */}
                    <div className="category">
                      <span>Rating</span>
                      <label>
                        <input type="checkbox" value="1" /> 1 star
                      </label>
                      <label>
                        <input type="checkbox" value="2" /> 2 stars
                      </label>
                      <label>
                        <input type="checkbox" value="3" /> 3 stars
                      </label>
                      <label>
                        <input type="checkbox" value="4" /> 4 stars
                      </label>
                      <label>
                        <input type="checkbox" value="5" /> 5 stars
                      </label>
                    </div>
                    {/* Genres */}
                    <div className="category">
                      <span>Genre</span>
                      <label>
                        <input type="checkbox" value="action" /> Action
                      </label>
                      <label>
                        <input type="checkbox" value="comedy" /> Comedy
                      </label>
                      <label>
                        <input type="checkbox" value="horror" /> Horror
                      </label>
                      <label>
                        <input type="checkbox" value="Romance" /> Love
                      </label>
                      <label>
                        <input type="checkbox" value="Drama" /> Drama
                      </label>
                      <label>
                        <input type="checkbox" value="sci-fi" /> Sci-fi
                      </label>
                    </div>
                    <button className="apply-btn" onClick={handleApplyFiltersClick}>
                      Apply
                    </button>
                  </div>
                </div>
                {/* Search Box */}
                <div className="search-box">
                  <input type="text"
                    id="search-input"
                    placeholder="Search for movies"
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                  />
                  <button onClick={handleSearchClick}>Search</button>
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
              </div>
            </li>
            <li>
              <button onClick={() => navigate("/home")} className="nav-btn">Home</button>
            </li>
            <li>
              <button onClick={() => navigate("/userprofile")} className="nav-btn" >Profile</button>
            </li>
          </ul>
          {flag === 0 && (
            <div className="button">
              <li>
                <button onClick={() => navigate("/")} className="btn signin">Signin</button>
              </li>
              <li>
                <button onClick={() => navigate("/")} className="btn signup">Signup</button>
              </li>
            </div>
          )}
        </div>

        {/* Menu Icon */}
        <div className="menu-icon" onClick={toggle}>
          <i className="fa-solid fa-bars" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <ul className="mobile-nav">
        <li className="active">
          <i className="fa-solid fa-house" />
          <button className="nav-btn" onClick={() => navigate("/home")}>Home</button>
        </li>
        <li>
          <i className="fa-solid fa-film" />
          <button className="nav-btn" onClick={() => navigate("/moviepage")}>Movies</button>
        </li>
        {flag === 0 && (
          <>
            <li>
              <i className="fa-solid fa-right-to-bracket" />
              <button className="nav-btn" onClick={() => navigate("/signin")}>SignIn</button>
            </li>
            <li>
              <i className="fa-solid fa-user-plus" />
              <button className="nav-btn" onClick={() => navigate("/signup")}>SignUp</button>
            </li>
          </>
        )}
      </ul>

      <div className="backdrop" onClick={toggle} />
    </nav>
  );
};

export default Navbar;
