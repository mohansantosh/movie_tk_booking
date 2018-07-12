import React, {Component} from 'react';
import '../background.jpeg';
import Cinema from './Cinema';
import Movie from './Movie';
import Seat from './Seat'
import ScreenLayout from './ScreenLayout';
import Booking from './Booking';
import{
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardLink,
    Button,
    Container,
    Row,
    Col,
} from 'reactstrap';

import axios from 'axios';

class CinemaHomePage extends Component {
    constructor(props)
    {
        super(props);
        this.state ={
            movies: []
        }
        axios.get('/api/movies').then(res => {
                this.setState({movies: res.data});
            });
    }
    
    render(){
        const {movies} = this.state ;

    return(
        <div background="./public/background.jpg">
        <Booking/>
        <div>
            <img src= "https://img.spicinemas.in/resources/images/screen-this-way.png" />
        </div>
      </div>
    );
}
}

export default CinemaHomePage;