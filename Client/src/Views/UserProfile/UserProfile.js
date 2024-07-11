import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import Navbar from '../../components/NavBar/navBar';
import UserReviewCard from '../../components/reviewCard/userReviewCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import popupReviewCardProfilePage from '../../components/PopupReviewCardProfilePage/popupReviewCardProfilePage';
const UserProfile = () => {

    const [reviews,setReviews] = useState([]);
    // const [UpdatePopup,setUpdatePopup] = useState(false);

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

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/fetchData/fetchReviewData?userId=${userId}`);
            setReviews(response.data.reviews);
        }catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    useEffect(()=>{
        if(flag==1){
            fetchData();
        }
    },[]);


    return (
        <div className="profile-container">
            <div className="DarkOverlay">
                <div className="NavBarContainer">
                    <Navbar />
                </div>
                {/* <div className="profile-header">
                    <div className="profile-image">
                        <img src="https://via.placeholder.com/80" alt="User Icon" />
                    </div>
                    <div className="profile-info">
                        <h1>Alexander Fernandez</h1>
                        <p>userid:1720441056832433000</p>
                        <p>alhandro345@gmail.com</p>
                    </div>
                </div> */}
                <div className="profile-activity">
                    <h1>Your past reviews</h1>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    {reviews.map((rev) => (
                        <UserReviewCard reviewData={rev} userId={userId} fetchData={fetchData} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;