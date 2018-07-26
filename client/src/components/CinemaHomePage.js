import React, {Component} from 'react';
import '../background.jpeg';
import ShowAllMovies from './ShowAllMovies'

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
    return(
        <div background="./public/background.jpg">
        <ShowAllMovies />
        
      </div>
    );
}
}

export default CinemaHomePage;