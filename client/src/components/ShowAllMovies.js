import React, { Component } from 'react';
import axios from 'axios';
import {
    Preloader,
    Row,
    Col,
    Carousel,
    Container
} from 'react-materialize';

import Movie from './Movie';
export default class ShowAllMovies extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: null
        }
        this.getAllMovies = this.getAllMovies.bind(this);
    }

    componentDidMount(){
        this.getAllMovies();
    }

    getAllMovies(){
        axios.get('/api/movies').
            then((data) => {
                this.setState({movies: data.data})
            }
        )
    }
  render() {
      console.log("entering...");
      const {movies} = this.state
      console.log(movies);
    return (
      <div>
        <Container>
        <Row>
            {
                (movies !== null) ? (
                movies.map((movie) =>{
                    console.log(movie);
                    return(
                        <Movie movie = {movie}/>
                    )
                })
             ) : (
                <Col s={4}>
                    <Preloader size='big'/>
                </Col>
           )
          }
        </Row>
       </Container>
      </div>
    )
  }
}
