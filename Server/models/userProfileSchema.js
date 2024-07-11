const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  uid: { type: Number, required: true, unique: true },
  movieReviewIds:[{
    movieId:Number,
    reviewId:Number,
  }]
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);