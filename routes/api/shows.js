const express = require('express');

const router = express.Router();



router.get('/:id',(req,res) => {
    Show.find({_id: req.params.id}).
    populate('movie').
    populate('cinema').
    then((show) => 
        res.json(show) )
});


module.exports = router;