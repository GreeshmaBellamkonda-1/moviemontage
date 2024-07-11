import React, { useEffect, useState } from 'react';
import PopupReviewCard from '../../components/PopupReviewCard/popupReviewCard';
import "./MoviePage.css"
import Navbar from '../../components/NavBar/navBar'
import ReviewCard from '../../components/reviewCard/reviewCard';
import { useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // to get special icons from fontawesome icons
import axios from 'axios';
import { useSelector } from 'react-redux';


const MoviePage = () => {

    let flag = 1;
    let userId;
    const user = useSelector(state => state.user); // Assuming 'state.user' contains the user object

    if (user && user.user && user.user.uid) {
        userId = user.user.uid;
        console.log("userid", userId);
    } else {
        flag = 0;
    }

    console.log("flag", flag);

    

    const location = useLocation();
    const [showPopup, setShowPopup] = useState(false);
    const movieid = location.state.movieid;

    const [movieData, setMovieData] = useState({});
    const [reviewsData, setReviewsData] = useState([]);

    const fetchMovieData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/fetchData/fetchMovieData?movieId=${movieid}`);
            setMovieData(response.data.movieData);
            setReviewsData(response.data.reviewsData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    const togglePopup = () => {
        if(flag==0){
            alert("Login or Signup to rate the movie!")
        }else{
            setShowPopup(!showPopup);
        }
        
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        fetchMovieData();
    }, []);

    const imageName = movieData.poster;

    return (
        <div>
            <div className="MasterContainerMoviePage">
                <div className="MoviePageNavBarContainer">
                    <Navbar />
                </div>
                <div className="DarkOverlay">
                    <div className="ImageAndRatingContainer">
                        <div className="ImageDivContainer">
                            <img src={`./images/${imageName}`} style={{ height: "400px", width: "350px", borderRadius: "3%" }} />
                        </div>
                        <div className="ImageDivContentContainer">
                            <h1>{movieData.title}</h1>
                            <div className="RatingDisplayContainer">
                                {movieData.stars}
                            </div>
                            <div className="LanguagesContainer">
                                {movieData.language}
                            </div>
                            <div className="MinorDetailsContainer">
                                {movieData.genre} - {movieData.release_year}
                            </div>
                            <button id="rate-now-btn" className="RateNowButton" onClick={togglePopup}>Rate Now!</button>
                            {showPopup && <PopupReviewCard onClose={handleClosePopup} userId={userId} movieId={movieData.id}/>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="AboutMovieSection">
                <h1>About movie</h1>
                <p>{movieData.summary}</p>
            </div>
            <div>
                {reviewsData.length === 0 ? (
                    <div style={{ display: "flex", flexDirection: "row", columnGap: "5%", overflowX: "auto", whiteSpace: "nowrap",color:"Black" }}>
                        No reviews to display
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "row", columnGap: "5%", overflowX: "auto", whiteSpace: "nowrap" }}>
                        {reviewsData.map((rev) => (
                            <ReviewCard key={rev.reviewId} reviewData={rev} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MoviePage;
