import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import Navbar from '../../components/NavBar/navBar';
import MightAlsoSearchFor from '../../components/MightAlsoSearchFor/MightAlsoSearchFor';
import './HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [filterData, setFilterData] = useState({
    genres: [],
    ratings: [],
    movieTitle:"",
    superId:""
  });
  const [moviesData, setMoviesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chunkOne, setChunkOne] = useState([]);

  const fetchData = async () => {
    try {
      console.log("FilterDataInsideFetchFunction", filterData);
      const response = await axios.get(`http://localhost:3001/searchMovies/filterMovies?genres=${filterData.genres}&ratings=${filterData.ratings}&movieTitle=${filterData.movieTitle}&superId=${filterData.superId}`);
      setMoviesData(response.data.movies);
    } catch (e) {
      console.log(e);
    }
  }
  const getfilterData = async (data) => {
    setFilterData(data);
    setCurrentIndex(0);
  }

  // console.log("FilterData Homepage",filterData);

  useEffect(() => {
    fetchData();
    // setChunks();
  }, [filterData]);

  useEffect(() => {
    setChunks();
  }, [moviesData, currentIndex]);

  const setChunks = () => {

    if (moviesData) {
      setChunkOne([]);
      
      console.log(currentIndex);
      if (currentIndex + 2 > moviesData.length) {
        setChunkOne(moviesData.slice(currentIndex, moviesData.length));
      } else {
        setChunkOne(moviesData.slice(currentIndex, currentIndex + 3));
        
      }
    }

  }

  const handleNext = () => {
    // setChunks();
    if (currentIndex < moviesData.length) {
      setCurrentIndex(currentIndex + 3);
    }
    if (currentIndex > moviesData.length) {
      setCurrentIndex(currentIndex);
    }
  }

  const handlePrev = () => {
    if (currentIndex >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
    if (currentIndex < 0) {
      setCurrentIndex(currentIndex);
    }
  }

  console.log("Movies data homepage", moviesData);
  console.log("ChunkOne", chunkOne);
 




  return (
    <div className="MasterContainer">
      <div className="NavBarContainer">
        <Navbar filterData={getfilterData} />
      </div>

      <div className="HomeDiv">
        <div className="DarkOverlay">
          <div className="ContentContainer">
            

              <div className="MovieCardContainer">
                {chunkOne.map((mov) => (
                  <MovieCard movie={mov} /> //Please adjust the CSS in the card component folder
                ))}
              </div>
              

            <div className="YouMayAlsoSearchForContainer">
              <MightAlsoSearchFor filterData={getfilterData}/>  
            </div>
          </div>


          <div class="NextPrevButtonDiv">
  <button class="next-prev-button" id="button1" onClick={handlePrev}>Previous</button>
  <button class="next-prev-button" id="button2" onClick={handleNext}>Next</button>
</div>

        </div>

      </div>
    </div>
  );
                };

export default HomePage;
