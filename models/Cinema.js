const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create our schema

const CinemaSchema = new Schema({
    name:{
        type: String
    },
    image:{
        type: String
    },
    description:{
        type: String
    },
    location:{
        type: String
    }
});

module.exports = Cinema = mongoose.model('cinema',CinemaSchema);

