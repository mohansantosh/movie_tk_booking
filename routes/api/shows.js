const express = require('express');

const router = express.Router();


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


router.get('/:id',(req,res) => {    
    Show.find({_id: req.params.id}).
    populate('movie').
    populate('cinema').
    then((show) =>{ 
        var formatted_show = [];
        var show_data = show[0]
        console.log("entering show info....");
        var showDate = new Date(show_data.showTime);
        var formatted_date;
        console.log(showDate);
        formatted_date = showDate.toLocaleTimeString("en-US",{  
            weekday: 'short',
            day : 'numeric',
            month : 'short'
        });
        show_data.formatted_date = formatted_date;
        formatted_show.push(show_data)
        console.log(show_data);
        res.json(formatted_show);
    })
});


module.exports = router;