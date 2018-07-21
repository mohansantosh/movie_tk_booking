const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create our schema

const CinemaSchema = new Schema({
    id: mongoose.Schema.ObjectId,
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

module.exports = Cinema = mongoose.model('Cinema',CinemaSchema);

