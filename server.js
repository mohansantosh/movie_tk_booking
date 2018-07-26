const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const app = express();



//Body Parser Middleware

app.use(bodyParser.json());


const cinema = require('./routes/api/cinemas');
const movie = require('./routes/api/movies');
const show = require('./routes/api/shows');
const ticket = require('./routes/api/ticket');
//DB config

const db = require('./config/keys').mongoURI;

//Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log("Mongodb is connect!!") )
    .catch(err => console.log(err));

const port = process.env.PORT || 5000

app.use('/api/cinemas',cinema);
app.use('/api/movies',movie);
app.use('/api/shows',show)
app.use('/api/tickets/',ticket);
app.listen(port,() => console.log("Server started on port 5000"));

        