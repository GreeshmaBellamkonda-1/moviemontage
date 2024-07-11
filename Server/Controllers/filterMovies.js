const Movies = require("../models/movieSchema.js");

const filterMovies = async (req, res) => {
    try {
        console.log("Filtering movies route hit!!!");

        const { ratings, genres, movieTitle,superId } = req.query;
        let data;
        let query = {};

        console.log(ratings);
        if (movieTitle) {  //If movie title is there then go for that first !@#!@#!#
            const regexPattern = new RegExp(`${movieTitle.split('').join('.*')}`, 'i');
            query.title = regexPattern;
            data = await Movies.find(query);
        }
        else if (ratings || genres) {  //If genres or ratings there an os on then go here 

            if (ratings && ratings.length > 0) {
                const ratingsArray = ratings.split(',');   //Converting the ratings from frontend to array 

                const ratingQueries = ratingsArray.map(rating => {
                    const lowerBound = parseInt(rating, 10);  // Convert string to integer
                    const upperBound = lowerBound + 0.9;
                    console.log("lowerbound",lowerBound);
                    console.log("upperBound",upperBound);
                    return { stars: { $gte: lowerBound, $lt: upperBound } };
                }); 

                query.$or = ratingQueries;
            }
            
            
            if (genres && genres.length > 0) {
                const genreArray = genres.split(',');
                query.genre = { $in: genreArray };
            }
            data = await Movies.find(query);

        }else if(superId)
        {
            if(superId=="HR"){
                data = await Movies.find().sort({stars:-1}).limit(10);
            }else if (superId=="LR"){
                data = await Movies.find().sort({stars:1}).limit(10);
            }else if(superId=="RL"){
                data = await Movies.find().sort({release_year:-1}).limit(10);
            }else if(superId=="OR"){
                data = await Movies.find().sort({release_year:1}).limit(10);
            }
        } 
        else {
            data = await Movies.find();
        }

        console.log("Query", query)

        return res.status(200).json({ success: true, movies: data });
    } catch (e) {
        console.error("Error filtering movies:", e);
        return res.status(500).json({ success: false, error: e.message });
    }
}

module.exports = filterMovies;
