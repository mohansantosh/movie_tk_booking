import React, { Component } from 'react';
import axios from 'axios';
import {
    Preloader,
    Row,
    Col,
    Card,

} from 'react-materialize';
import {
    Container
} from 'reactstrap';
import Movie from './Movie';
import Date from './Date';
import './loader.css'
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
            <Container style={{marginTop: "25px"}}>
                
                <Card inverse style = {{backgroundColor: 'rgba(23,162,184,0)'}} className="text-left">
                    <Row>
                    <Col ><Date /></Col>
                    </Row>
                </Card>
            </Container>
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
                    <Preloader className = "top" size='big'/>
                </Col>
           )
          }
        </Row>
       </Container>
      </div>
    )
  }
}
