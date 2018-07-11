
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    rating:{
        type: String
    },
    genre:{
        type: String
    },
    image: {
        type: String
    }
});


module.exports = Movie = mongoose.model('movie',movieSchema);