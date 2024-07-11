const UserProfile = require("../models/userProfileSchema");
const Movie = require("../models/movieSchema");
const Review = require("../models/reviewSchema");

function generateId(N) {
    // Generate a random number with N digits
    const randomComponent = Math.floor(Math.random() * (Math.pow(10, N) - Math.pow(10, N - 1))) + Math.pow(10, N - 1);

    return randomComponent;
}

const CreateReviewController = async (req, res) => {
    try {
        const { userId, MovieId, ratingStars, reviewContent } = req.body;
        console.log(userId, MovieId, ratingStars, reviewContent);

        //Store the new review 
        const reviewId = generateId(4);
        const newReview = new Review({
            review: reviewContent,
            rating: ratingStars,
            reviewId: reviewId,
        })
        await newReview.save();

        //Store the reviewId in userProfile mapped to movieID
        const newUserReview = await UserProfile.findOne({ uid: userId });
        // console.log(newUserReview.length);
        if (newUserReview) {
            newUserReview.movieReviewIds.push({
                movieId: MovieId,
                reviewId: reviewId
            })

            await newUserReview.save();
        } else {
            console.log("gagubai")
            const userReview = new UserProfile({
                uid: userId,
                movieReviewIds: [{
                    movieId: MovieId,
                    reviewId: reviewId,
                }]
            })
            await userReview.save();
        }


        //Store the review id in the respective movie 

        const newReviewForMovie = await Movie.findOne({ id: MovieId });
        // console.log(newReviewForMovie.reviewids);
        if (!newReviewForMovie.reviewids) {
            console.log("chikabu");
            newReviewForMovie.reviewids = [];
        }
        newReviewForMovie.reviewids.push(reviewId)
        await newReviewForMovie.save();

        //update movie ratings-------------------------------------------------------------------RE CALCUALTING THE REVIEW IDS
        const movie = await Movie.find({ id: MovieId });  //Fetch the review IDs from movie 
        const reviewIds = movie[0].reviewids;

        const reviewRatings = await Review.find({ reviewId: { $in: reviewIds } });  //Find all the reviews whith the fteched review ids 

        if (reviewRatings.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this movie' });
        }

        // Calculate the average rating
        const totalRating = reviewRatings.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviewRatings.length;

        // console.log("Averagte rating is",averageRating)

        const updatedMovieRating = await Movie.findOneAndUpdate(  //Update the average rating again 
            { id: MovieId },
            {
                $set: {
                    'stars': averageRating
                }
            },
            {
                new: true,
            }
        )
            res.status(200).json({ success:true,message: 'Review created successfully and movie rating update accordingly' });
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ success:false, message: 'Internal server error' });
    }
}

module.exports = CreateReviewController;