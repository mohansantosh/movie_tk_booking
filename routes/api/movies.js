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
                                showTime: data[i].showTime,
                                formatted_time: data[i].formatted_time});
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
                                    showTime: data[i].showTime,
                                    formatted_time: data[i].formatted_time
                                }]
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
                        showTime: data[i].showTime,
                        formatted_time: data[i].formatted_time
                        }]
                }]  
            });
        }
    }
    return result;
}

function formatAMPM(date) {
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
//@route GET /api/movies
//@desc gets all the applicable movies
//@access public

function convertUTCToIST(date){
    var dateUTC = new Date(date);
    var dateUTC = dateUTC.getTime() 
    var dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5); 
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST;
}

function convertISTToUTC(dateIST){
    var dataUTC = new Date(dateIST);
    dataUTC.setHours(dateIST.getHours() - 5); 
    dataUTC.setMinutes(dateIST.getMinutes() - 30);
    return dataUTC
}

function calcTime( offset) {

    // create Date object for current location
    d = new Date();
    
    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*offset));
    console.log(nd);
    // return time as a string
    return nd;

}



function getMovieDates(){
    var applicableDates = [];
    var i ;
    for(i =0 ; i < 7; i++){
        var selected = false;
        var dateInfo = {};
        var dateIST = new Date();
        
        if(i != 0){
            dateIST.setDate(dateIST.getDate() + i);
            dateIST.setMinutes(0);
            dateIST.setHours(0);
        }
        var formatted_dateIST = convertUTCToIST(dateIST);
        console.log(formatted_dateIST);

        var weekday = dateIST.toLocaleString('en-US', { weekday: 'short' });
        var month =  dateIST.toLocaleString('en-US', { month: 'short' });
        var day = dateIST.getDate();
        console.log(dateIST.getHours() + dateIST.getMinutes());
        dateInfo = {id: i, weekday: weekday,month: month, day: day, date: formatted_dateIST, selected: selected, disabled: false}
        applicableDates.push(dateInfo) 
    }
    return applicableDates
}



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

router.get('/intdata',(req,res) => {
    var result = {};
    var applicableDates = getMovieDates();
    var formattedDates = [];
    var allMovies = [];
    var intData = null;
    var promises = [];
    applicableDates.forEach((date,index,array) => {
        promises.push(new Promise((resolve,reject) => {
            var maxDate = new Date(date.date);
            maxDate.setUTCMinutes(59);
            maxDate.setUTCHours(23);
            Show.findOne({showTime: {$gte: date.date,$lt: maxDate}})
                .then((show) =>{
                        if (show == null)
                            resolve({date: date,movies: null})
                        else 
                            return new Promise((resolve,reject) => {
                                Show.find({showTime: {$gte: date.date,$lt: maxDate}}).
                                populate('movie')
                                .then((shows) => {
                                    var obj = {};
                                    var movies  = []
                                    for(var i = 0 ; i < shows.length; i ++)
                                        obj[shows[i].movie._id] = shows[i].movie;
                                    for(var key in obj)
                                        movies.push(obj[key]);
                                    resolve({date: date,movies: movies});
                                })
                            })
              }).then((data) => resolve(data))
            }));
        });
        console.log("promises are");
        Promise.all(promises).then((promises) => {
        for(var i = 0 ; i < promises.length; i ++){
            if(intData === null && (promises[i].movies != null && promises[i].movies.length != 0)){
                promises[i].date.selected = true;
                intData = promises[i].date;
                allMovies = promises[i].movies;
            }
            if(promises[i].movies == null)
                promises[i].date.disabled = true;
            formattedDates.push(promises[i].date);
        }
        allMovies.sort(function(a,b){
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        })
        result.movies = allMovies;
        result.intDate = intData;
        result.dates = formattedDates;
        res.json(result);
    });
});

router.get('/get_dates',(req,res) => {
    var result = getMovieDates();
    res.json(result);
})
router.post('/movies_by_date',(req,res) => {
    var movies = [];
    console.log("getting all movies");
    console.log(req.body);
   const date = new Date(req.body.date);
   var max_date = new Date(date);
   console.log(max_date)
   max_date.setUTCMinutes(59);
   max_date.setUTCHours(23);
   console.log(date);
   console.log(max_date);
   Show.find({showTime: {$gte: date, $lt: max_date}})
        .populate('movie')
        .then((shows) => {
            var obj = {};
            for(var i = 0 ; i < shows.length; i ++)
                obj[shows[i].movie._id] = shows[i].movie;
            
            for(var key in obj)
                movies.push(obj[key]);
            movies.sort(function(a,b){
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            })
            res.json(movies)
        });
});


router.post('/init_shows',(req,res) => {
    var result = {};
    const movieId = req.body.movieId
    var dates = getMovieDates();
    var formatted_dates = [];
    var all_movies = [];
    var int_data = null;
    var promises = [];
    dates.forEach((date,index,array) => {
        promises.push(new Promise((resolve,reject) => {
            var max_date = new Date(date.date);
            max_date.setMinutes(29);
            max_date.setHours(18);
            Show.findOne({movie: movieId,showTime: {$gte: date.date,$lt: max_date}})
                .then((show) =>{
                        if (show == null)
                            resolve({date: date,movies: null})
                        else 
                            return new Promise((resolve,reject) => {
                                Show.find({showTime: {$gte: date.date,$lt: max_date}}).
                                populate('cinema')
                                .then((shows) => {
                                    var obj = {};
                                    var movies  = []
                                    for(var i = 0 ; i < shows.length; i ++)
                                        obj[shows[i].movie._id] = shows[i].movie;
                                    for(var key in obj)
                                        movies.push(obj[key]);
                                    resolve({date: date,movies: movies});
                                })
                            })
              }).then((data) => resolve(data))
            }));
        });
        console.log("promises are");
        Promise.all(promises).then((promises) => {
        for(var i = 0 ; i < promises.length; i ++){
            if(int_data == null && (promises[i].movies != null && promises[i].movies.length != 0)){
                promises[i].date.selected = true;
                int_data = promises[i].date;
                all_movies = promises[i].movies;
            }
            if(promises[i].movies == null)
                promises[i].date.disabled = true;
            formatted_dates.push(promises[i].date);
        }
        all_movies.sort(function(a,b){
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        })
        result.movies = all_movies;
        result.int_date = int_data;
        result.dates = formatted_dates;
        res.json(result);
    });
});

router.post('/test',(req,res) =>{
    if(req.body.date == null){
        var date = new Date()  
        dateIST = convertUTCToIST(date) 
    }
    else
    {
        var date = new Date(req.body.date);
    }
    var max_date = new Date();
    max_date.setMinutes(59);
    max_date.setHours(23);
    max_date = convertUTCToIST(max_date)
    console.log(date);
    console.log(max_date);
    Show.find({showTime: {$gte: date,$lt: max_date}})
                .then((show) => {
                    res.send({show})
                })
})

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
router.post('/:movieId',(req,res) =>{
    const dates  = getMovieDates()
    var date = req.body.date
    if (date == null){
        date = new Date();
    }
    else
        date = new Date(date);
    console.log(date);
    var max_date = new Date(date);
    console.log(max_date);
    max_date.setUTCMinutes(59);
    max_date.setUTCHours(23);
    console.log(max_date);

    Show.find({movie: {_id: req.params.movieId}, showTime: {$gte: date, $lt: max_date}}).
    populate('cinema').
    populate('movie')
    .then((shows) => 
    {
        shows.sort((a,b) => {
            return a.showTime  - b.showTime
        })
        shows.forEach(show => {
            var showDate = new Date(show.showTime);
           show.formatted_time= formatAMPM(showDate);;
           console.log(show.formatted_time);
        });

        data = groupBy(shows);
        res.send({data: data,dates: dates});
    });
}

);

router.post('/init_movie/:movieId',(req,res) =>{
    const movieId = req.params.movieId;
    if(req.body.movieDate != null)
        var movieDate = new Date(req.body.movieDate)
    else
        var movieDate = new Date()
    movieDate = movieDate.getUTCDate();
    var applicableDates = getMovieDates();
    var formattedDates = [];
    var promises = [];
    var intDate = null;
    var isMoviesAvailForGivenDate = false;
    applicableDates.forEach((date,index,array) => {
    promises.push(new Promise((resolve,reject) => {
        var maxDate = new Date(date.date);
        maxDate.setUTCMinutes(59);
        maxDate.setUTCHours(23);
        Show.findOne({movie: {_id: movieId},showTime: {$gte: date.date,$lt: maxDate}})
            .then((show) =>{
                        resolve({date: date,show: show})        
            })
        }));
    });
    console.log("promises are");
    console.log(movieDate);
    Promise.all(promises).then((promises) => {
    console.log("all promises resolved..");
    for(var i = 0; i < promises.length; i++){
        var date = new Date(promises[i].date.date)
        var date = date.getUTCDate();
        if(date == movieDate && promises[i].show != null){
            console.log("entering int date");
            promises[i].date.selected = true;
            isMoviesAvailForGivenDate = true;
            intDate = promises[i].date;
        } 
    }
    for(var i = 0 ; i < promises.length; i ++){
       if(promises[i].show != null && intDate == null){
            promises[i].date.selected = true;
            intDate = promises[i].date;
       }
       if(promises[i].show == null){
        promises[i].date.disabled = true;
       }
       formattedDates.push(promises[i].date);
    }
    
    res.json({dates:formattedDates,intDate: intDate});
    });
});

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




