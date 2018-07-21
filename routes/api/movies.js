var express = require('express');

var router = express.Router();

const Movie = require('../../models/Movie');
const Cinema = require('../../models/Cinema');
const Show  = require('../../models/Show');


function groupBy(data){
    var result = [];
    var shows_info;
    for(i = 0; i < data.length; i++){
        isAdded = false;
        for(j = 0; j < result.length; j++)
        {
            if(result[j].movie_description.name == data[i].movie.name)
            {
                for(k = 0; k < result[j].cinemas.length; k++)
                {
                    if(result[j].cinemas[k].name ==  data[i].cinema.name){
                        result[j].cinemas[k].shows.push({
                                id: data[i]._id,
                                showTime: data[i].showTime});
                        isAdded = true;
                    }
                }
                if(!isAdded)
                    {
                        result[j].cinemas.push(
                            {
                                id: data[i].cinema._id,
                                name:   data[i].cinema.name,
                                location: data[i].cinema.location,
                                image: data[i].cinema.image,
                                shows: [{ 
                                    id: data[i]._id,
                                    showTime: data[i].showTime}]
                            })
                            isAdded = true;
                    }

            }
        }
        if(!isAdded){
            
            result.push({
                movie_description: {
                    id: data[i].movie._id,
                    name: data[i].movie.name,
                    language:  data[i].movie.language,
                    image: data[i].movie.image,
                    rating:   data[i].movie.rating,
                    description: data[i].movie.description
                } ,
                cinemas: [{
                    id: data[i].cinema._id,
                    name:   data[i].cinema.name,
                    location: data[i].cinema.location,
                    image:data[i].cinema.image,
                    shows: [{ 
                        id: data[i]._id,
                        showTime: data[i].showTime}]
                }]  
            });
        }
    }
    return result;
}
//@route GET /api/movies
//@desc gets all the applicable movies
//@access public
router.get('/',(req,res) => {
    Movie.find({}).
          then((movies => res.json(movies))); 
});

//@route POST /api/movies
//@desc Post call to submit movie info
//@access public
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



//@route GET /api/movies/:id
//@desc get call to get movies by id
//@access public
/*
router.get('/:id', (req,res) => {
    Movie.findOne({_id: req.params.id})
         .then((movie) => {
            res.json(movie)
         });
});
*/
router.get('/:movieId',(req,res) =>{
    Show.find({movie: {_id: req.params.movieId}}).
    populate('cinema').
    populate('movie')
    .then((shows) => 
    {
        data = groupBy(shows);
        res.send(data);
    });
}

);

router.post('/createshow',(req,res) =>{
    Movie.findById(req.body.movie, (err,movie) =>{
        Cinema.findById(req.body.cinema, (err,cinema) => {
            Show.create({
                cinema: cinema._id,
                movie: movie._id,
                showTime: req.body.showTime,
                showDate: req.body.showDate
            },(err,show) => {
                res.json(show)
            })
        })
    } );
 }
);

module.exports=router;




