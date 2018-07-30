import React from 'react'
import {Switch,Route} from 'react-router-dom'

import ShowAllMovies from './ShowAllMovies';
import MovieList from './MovieList';
import Booking from './Booking';
import ConfirmBooking from './ConfirmBooking'
import Home from './Home'
import Success from './Success';

const Main = () => (
    <main>
        <Switch>
            <Route exact path = '/' component = {Home} />
            <Route path = '/listing/:id' component = {MovieList} />
            <Route exact path = '/seatselection/:id' component = {Booking}/>
            <Route exact path = '/confirmbooking' component = {ConfirmBooking} />
            <Route exact path = '/allmovies' component = {ShowAllMovies} />
            <Route exact path = '/success' component = {Success} />
        </Switch>


    </main>

);

export default Main;
