import React, { Component } from 'react'
import{
    Container

} from 'reactstrap';

import {
    Button,
    Row,
    Col,
    Preloader,
    Card,
    CardImg,
    CardTitle
} from 'react-materialize';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './loader.css'
import DateList from './DateList';
import Error from './Error'

export default class MovieList extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieId: this.props.match.params.id,
            data: null,
            dropdownOpen: false,
            dates: null,
            isMovieList_empty: false,
            selectedDate: this.props.location.state.selectedDate
        }
        this.toggle = this.toggle.bind(this);
        this.getMovieList = this.getMovieList.bind(this);
        this.handleDateChange  = this.handleDateChange.bind(this);
    }

    componentDidMount(){

        this.getMovieList();
    }

    handleDateChange(date){
        var dates = this.state.dates;
        const {movieId} = this.state;
        dates.forEach(x => {
            if(date === x.date)
                x.selected = true;
            else
                x.selected = false;
        });
        axios.post(`/api/movies/${movieId}`,{
            date: date})
        .then((response) => {
            var isMovieListEmpty = false
            if(response.data.length == 0) {
                isMovieListEmpty = true
            }
            this.setState({
                selectedDate : date,
                data: response.data.data[0],
                dates: dates,
                isMovieListEmpty: isMovieListEmpty,
                dates : dates
            })
        })
    }

    getMovieList(){
        var dates = [];
        var isMovieListEmpty = false;
        var intDate;
        const movieId = this.props.match.params.id;
        axios.post(`/api/movies/init_movie/${movieId}`,{
            movieDate: this.state.selectedDate
        })
        .then((response) => {
            console.log( response.data);
            dates = response.data.dates;
             intDate = response.data.intDate.date;
            return new Promise((resolve,reject) => {
                axios.post(`/api/movies/${movieId}`,{
                    date: intDate})
                .then((response) => resolve(response))
            })
        }).then((response) => {
            console.log(response);
            if(response.data.length == 0) {
                isMovieListEmpty = true
            }
            this.setState({ 
                data: response.data.data[0],
                dates: dates,
                selectedDate: intDate,
                isMovieListEmpty: isMovieListEmpty    
             });
        });
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    movieListing(showInfo){
       return(
        <Container style={{marginTop: '30px'}}>
            <Row>
                <Col sm={3} className='col-list-align'>
                    <CardTitle style={{marginRight: '2.6rem',fontSize: '20px',color: 'white'}} className='text-left '>{showInfo.name}<small> A/C | DTS </small></CardTitle>
                </Col>
                {
                    showInfo.shows.map((show) => {
                        return(
                            <Col sm={1} className='btn-text-align'>
                            <Link to = {`/seatselection/${show.id}`}>
                                <Button waves='light'  className='green font-size btn-text-align'>{show.formatted_time}</Button>    
                             </Link>   
                            </Col>
                        )
                    }) 
                }
            </Row>
        </Container>
       );
   }
   
  render() {
    const {data} = this.state;
    const {dates} = this.state;
    const {movie_list_empty} = this.state;
    console.log(dates);
    console.log(data);
      return (
        (movie_list_empty == true)? (
            <Error />
        ) :
        (data !== null) ?(
            <div>
            <Row>
                <Container>
                    <Card className='small'
                        header={<CardTitle image={data.movie_description.image} >{data.movie_description.name}</CardTitle>} className='card-color card-padding card-margin' >
                        <Col ><DateList dates={this.state.dates} handleDateChange={this.handleDateChange}/></Col>
                    </Card>
                </Container>
            </Row>
            <div>
                {
                    data.cinemas.map((showInfo) => {
                        return(
                        this.movieListing(showInfo));
                    })
                }
            </div>
            </div>) : (<Container >
                        <Preloader className = 'top' size='large'/>
                        </Container>
                  )
    )
  }    
}
