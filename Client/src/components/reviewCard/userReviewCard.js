import React, { useState } from 'react';
import './userReviewCard.css'; // Import your CSS file
import axios from 'axios';
import PopupReviewCardProfilePage from '../PopupReviewCardProfilePage/popupReviewCardProfilePage'; // Ensure the correct import

const UserReviewCard = ({ reviewData, userId, fetchData }) => {
    const maxRating = 5;

    const [isUpdatePopUp, setUpdatePopup] = useState(false);

    // Function to generate star icons dynamically
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <span key={i} className={i <= ratingValue ? 'fas fa-star' : 'far fa-star'}></span>
            );
        }
        return stars;
    };

    const ratingValue = reviewData.rating;

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log("deleting")
        try {
            const response = await axios.delete('http://localhost:3001/reviewChanges/deleteReview', {
                params: {
                    userId: userId,
                    movieId: reviewData.movieId,
                    reviewId: reviewData.reviewId,
                },
            });
            console.log(response.data);
            if (response.data.success) {
                console.log("fetchData did");
                fetchData();
            }
        } catch (e) {
            console.error("the error message", e.message);
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        console.log("hit");
        setUpdatePopup(true);
    }

    return (
        <div className="review-card">
            <div className="profile-pic">
                <i className="fas fa-user-circle"></i>
                <h2>{reviewData.name}</h2>
            </div>
            <div className="review-content">
                <p className="review-text">{reviewData.review}</p>
                <div className="rating">
                    {renderStars()}
                    <span className="rating-text">{`${ratingValue}/${maxRating}`}</span>
                </div>
            </div>
            <div className="actions">
                <div className="action-item">
                    <i className="fas fa-edit action-icon"></i>
                    <span className="action-text" onClick={handleEdit}>Edit</span>
                </div>
                <div className="action-item">
                    <i className="fas fa-trash-alt action-icon"></i>
                    <span className="action-text" onClick={handleDelete}>Delete</span>
                </div>
            </div>
            {isUpdatePopUp && <PopupReviewCardProfilePage userId={userId} movieId={reviewData.movieId} reviewId={reviewData.reviewId} fetchData={fetchData} onClose={() => setUpdatePopup(false)} />}
        </div>
    );
};

export default UserReviewCard;
