import React from 'react'
import {Switch,Route} from 'react-router-dom'

import ShowAllMovies from './ShowAllMovies';
import MovieList from './MovieList';
import ScreenLayout from './ScreenLayout';
import Booking from './Booking';
import ConfirmBooking from './ConfirmBooking'
import Home from './Home'

const Main = () => (
    <main>
        <Switch>
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/listing/:id' component = {MovieList} />
            <Route exact path = '/seatselection/:id' component = {Booking}/>
            <Route exact path = '/confirmbooking' component = {ConfirmBooking} />
            <Route exact path = '/allmovies' component = {ShowAllMovies} />
        </Switch>


    </main>

);

export default Main;
