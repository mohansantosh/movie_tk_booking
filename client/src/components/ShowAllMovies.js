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
import DateList from './DateList';
import './loader.css'
export default class ShowAllMovies extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: null,
            dates: null,
            selectedDate: null,
        }
        this.getAllMovies = this.getAllMovies.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount(){
        this.getAllMovies();
    }

  
    getAllMovies(){
        axios.get('/api/movies/intdata').
            then((data) => {
                console.log("entering.. axios..2")
                this.setState({
                    selectedDate : data.data.intDate.date,
                    dates : data.data.dates,
                    movies: data.data.movies
                });
            })
    }

    handleDateChange(date){
        var dates = this.state.dates;
        dates.forEach(x => {
            console.log(x.date);
            console.log(date);
            if(date == x.date){
                console.log("date match");
                x.selected = true;
            }
            else{
                console.log("date not match");
                x.selected = false;
            }
        });

        axios.post('/api/movies/movies_by_date',{
            date: date
        }).
        then((movies) => {
                console.log("entering.. axios..")
                console.log(movies);
                this.setState({
                    selectedDate : date,
                    dates : dates,
                    movies: movies.data
                })
            }
        )
    }
  render() {
      console.log("entering movies list>>>>");
      const {movies} = this.state;
      const {dates} = this.state;
      const {selectedDate} = this.state;
      console.log(selectedDate);
    return (
        (movies !== null && dates != null) ? (
        <div>
            <Container>
                <Container style={{marginTop: "25px"}}>
                    
                    <Card inverse style = {{backgroundColor: 'rgba(23,162,184,0)'}} className="text-left">
                        <Row>
                        <Col ><DateList dates={this.state.dates} handleDateChange={this.handleDateChange}/></Col>
                        </Row>
                    </Card>
                </Container>
                <Row>
                {   
                    movies.map((movie) =>{
                        return(
                            <Movie movie = {movie} selectedDate = {selectedDate}/>
                        )
                    })
                }
                </Row>
            </Container>
            </div>
            ): (
                <div>
                    <Container>
                        <Row>
                            <Col s={4}>
                                <Preloader className = "top" size='big'/>
                            </Col>
                        </Row>
                    </Container>
                </div>
           )
        )
    }
}
