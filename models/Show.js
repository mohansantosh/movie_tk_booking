const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const showSchema = new Schema({
    id: mongoose.Schema.ObjectId,
    movie: {
         type: Schema.Types.ObjectId, 
         ref: 'Movie' },
    cinema: 
    { type: 
        Schema.Types.ObjectId, 
        ref: 'Cinema' },
    showTime: {
        type: Date
    },
    showDate: {
        type: Date
    },
    formatted_date:{
        type: String
    }
});

module.exports = Show = mongoose.model('Show',showSchema);