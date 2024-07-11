const Review = require('../models/reviewSchema');
const Movie = require('../models/movieSchema');

const updateReview = async (req, res) => {
  try {
    const { userId, movieId, reviewId, reviewContent, rating } = req.body; // Change review to reviewContent

    console.log(userId, movieId, reviewContent, rating);

    const updatedReview = await Review.findOneAndUpdate(  //Fethc the review and update it using the revieID thing 
      { reviewId: reviewId },
      {
        $set: {
          'review': reviewContent,
          'rating': rating
        }
      },
      {
        new: true
      }
    );

    //update movie ratings--------------------------------RE CALCUALTING THE REVIEW IDS
    const movie=await Movie.find({id: movieId});  //Fetch the review IDs from movie 
    const reviewIds=movie[0].reviewids;
    
    const reviewRatings=await Review.find({reviewId:{$in:reviewIds}});  //Find all the reviews whith the fteched review ids 

    if (reviewRatings.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this movie' });
    }

    // Calculate the average rating
    const totalRating = reviewRatings.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviewRatings.length;

    // console.log("Averagte rating is",averageRating)

    const updatedMovieRating =await Movie.findOneAndUpdate(  //Update the average rating again 
      {id:movieId},   
      {
        $set:{
          'stars':averageRating
        }
      },
      {
        new:true,
      }
      )


      return res.status(200).json({success:true, message: 'updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { updateReview };