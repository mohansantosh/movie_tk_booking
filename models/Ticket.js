const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    id: mongoose.Schema.ObjectId,
    show: 
       { type: 
          Schema.Types.ObjectId, 
          ref: 'Show' },
    username:{
        type: String
    },
    email:{
        type: String 
    },
    mobile:{
        type: String
    },
    showDate:{
        type: String
    },
    showTime:{
        type: String
    },
    status: {
        type: String
    },
    tickets:{
        type: [String]
    }
})


module.exports = Ticket = mongoose.model('Ticket',ticketSchema);