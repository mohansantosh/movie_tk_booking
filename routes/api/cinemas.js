const express = require('express');

const router = express.Router();

//Cinema Model
const Cinema = require('../../models/Cinema');

// @route GET api/cinemas
// @dec Get all the cinemas
// @access public
router.get('/', (req,res) => {
    Cinema.find()
        .then((cinemas) => res.json(cinemas));
})

// @route POST api/cinemas
// @dec save the cinema in the database
// @access public
router.post('/', (req,res) => {
    const cinema = new Cinema({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        image: req.body.image
    });
    cinema.save().then(item => res.json(item));
});


// @route DELETE api/items/:id
// @dec delete the item in the database
// @access public
router.delete('/:id', (req,res) => {
    Item.findById({_id: req.params.id})
        .then(item => item.remove().then(res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});



router.get('/:cinemaId',(req,res) =>{
    Show.find({cinema: {_id: req.params.cinemaId}}).
    populate('cinema').
    populate('movie')
    .then((shows) => 
    {
        shows.sort((a,b) => {
            return a.showTime  - b.showTime
        })
        shows.forEach(show => {
           var showDate = new Date(show.showDate);
           show.showDate = showDate.toLocaleTimeString();
        });
        data = groupBy(shows);
        res.send(data);
    });
}

);
module.exports = router;