const UserProfile = require("../models/userProfileSchema");
const Movie = require("../models/movieSchema");
const Review = require("../models/reviewSchema");

const deleteReviewController = async (req, res) => {
    try {
        console.log("asdasdxxxxxxxx")
        const userId = req.query.userId;  //Change this to params.
        const movieId = req.query.movieId; //Change this to params.
        const reviewId = req.query.reviewId; //Change this to params.
        console.log(userId, movieId);
        // console.log(req.query);

        const userProfile = await UserProfile.findOne({ uid: userId });

        const reviewIdMovieIdIndex = userProfile.movieReviewIds.findIndex(mr => mr.reviewId == reviewId);

        //Delete that map
        userProfile.movieReviewIds.splice(reviewIdMovieIdIndex, 1);

        await userProfile.save();

        //Now delete from the review database
        const reviewToBeDeleted = await Review.deleteOne({ reviewId: reviewId });

        //Now delete from movie database
        const movieReviewToBeDeleted = await Movie.findOne({ id: movieId });

        const index = movieReviewToBeDeleted.reviewids.findIndex(mmr => mmr == reviewId);
        // console.log(index);
        movieReviewToBeDeleted.reviewids.splice(index, 1);
        await movieReviewToBeDeleted.save();

        //update movie ratings-----------------------------------------------------------------------------RE CALCUALTING THE REVIEW IDS
        const movie = await Movie.find({ id: movieId });  //Fetch the review IDs from movie 
        const reviewIds = movie[0].reviewids;

        const reviewRatings = await Review.find({ reviewId: { $in: reviewIds } });  //Find all the reviews whith the fteched review ids 

        if (reviewRatings.length === 0) {
            const updatedMovieRating = await Movie.findOneAndUpdate(  //Update the average rating again 
                { id: movieId },
                {
                    $set: {
                        'stars': 3
                    }
                },
                {
                    new: true,
                }
            )
            return res.status(200).json({ success:true,message: 'No reviews found for this movie hence value set to default 3' });
        }

        // Calculate the average rating
        const totalRating = reviewRatings.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviewRatings.length;

        // console.log("Averagte rating is",averageRating)

        const updatedMovieRating = await Movie.findOneAndUpdate(  //Update the average rating again 
            { id: movieId },
            {
                $set: {
                    'stars': averageRating
                }
            },
            {
                new: true,
            }
        )



       
       return res.status(200).json({sucess:true, message: 'Done' });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = deleteReviewController;