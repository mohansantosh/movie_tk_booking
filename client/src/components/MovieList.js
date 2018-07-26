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
import Date from './Date';

export default class MovieList extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieId: this.props.match.params.id,
            data: null,
            dropdownOpen: false
        }
        this.toggle = this.toggle.bind(this);
        this.getMovieList = this.getMovieList.bind(this);
    }

    componentDidMount(){
        this.getMovieList();
    }
    getMovieList(){
        const movieId = this.props.match.params.id
        axios.get(`/api/movies/${movieId}`)
        .then((response) => {
            this.setState({ 
                data: response.data[0]
            })});
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
                                <Button waves='light'  className='green font-size btn-text-align'>{show.showTime}</Button>    
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
      return (
        (data !== null) ?(
            <div>
            <Row>
                <Container>
                    <Card className='small'
                        header={<CardTitle image={data.movie_description.image} >{data.movie_description.name}</CardTitle>} className='card-color card-padding card-margin' >
                        <Col ><Date /></Col>
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
