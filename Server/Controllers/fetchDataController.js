const UserProfile = require("../models/userProfileSchema");
const Movie = require("../models/movieSchema");
const Review = require("../models/reviewSchema");

const fetchMovieData=async(req,res)=>{
    try{
        const {movieId}=req.query;

        const fetchedMovie=await Movie.findOne({id: movieId});

        const reviewids=fetchedMovie.reviewids;
        // console.log(reviewids);

        const reviewContents = await Review.find({ reviewId: { $in: reviewids } });

        return res.status(200).json({ success: true, movieData: fetchedMovie,reviewsData:reviewContents });

    }catch(e){
        console.log(e);
    }
}

const fetchReviewData = async (req, res) => {
    const { userId } = req.query;

    const user = await UserProfile.findOne({ uid: userId });

    let reviewIds = [];
    user.movieReviewIds.map((rev) => {
        reviewIds.push(rev.reviewId);
    });

    const reviews = await Review.find({ reviewId: { $in: reviewIds } });

    // Merge movieId into reviews
    const reviewsWithMovieId = reviews.map((review) => {
        const movieIdMap = user.movieReviewIds.find((map) => map.reviewId === review.reviewId);
        return {
            ...review.toObject(), // Convert Mongoose document to plain JavaScript object
            movieId: movieIdMap ? movieIdMap.movieId : null, // Add movieId if found
        };
    });

    res.status(200).json({ success: true, reviews: reviewsWithMovieId});
}

module.exports ={fetchMovieData,fetchReviewData};