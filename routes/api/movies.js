var express = require('express');

var router = express.Router();

const Movie = require('../../models/Movie');

//@route GET /api/movies
//@desc gets all the applicable movies
//@access public
router.get('/',(req,res) => {
    Movie.find({}).
          then((movies => res.json(movies))); 
});


router.post('/',(req,res) => {   
    const movie = new Movie({
            name: req.body.name,
            description: req.body.description,
            rating: req.body.rating,
            genre: req.body.genre,
            image: req.body.image
        });
    movie.save().then((movie) => {res.json(movie)});
});

router.get('/:id', (req,res) => {
    Movie.findOne({_id: req.params.id})
         .then((movie) => {
            res.json(movie)
         });
});

module.exports=router;




