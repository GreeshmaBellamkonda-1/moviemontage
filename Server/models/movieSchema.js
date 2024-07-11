const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    summary: { type: String, required: true },
    duration: { type: String, required: true },
    stars: { type: Number, required: true },
    release_year: { type: Number, required: true },
    language: { type: String, required: true },
    genre: { type: String, required: true },
    reviewids: { type: [Number]},
    cast: { type: [String], required: true },
});

const Movie=mongoose.model('Movie',MovieSchema);
module.exports =Movie;