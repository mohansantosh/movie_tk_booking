import React, { Component } from 'react'
import{
    Container,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    CardBody,
    CardSubtitle,
    CardText,
    Media,
    CardImg,
    Card,
    CardTitle,
    Title
} from 'reactstrap';

import {
    Button,
    Icon,
    Dropdown,
    NavItem,
    Chip,
    Row,
    Col,
    Preloader
} from 'react-materialize';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        console.log("enters listing");
        console.log(showInfo);
       return(
        <Container style={{marginTop: '30px'}}>
            <Row>
                <Col sm={3} >
                    <CardTitle style={{marginRight: '2.6rem',fontSize: '20px',color: 'white'}} className='text-left'>{showInfo.name}<small> A/C | DTS </small></CardTitle>
                </Col>
                {
                    showInfo.shows.map((show) => {
                        return(
                            <Col sm={1} >
                            <Link to = {`/seatselection/${show.id}`}>
                                <Button waves='light'  className='green' tooltip='Available'>{show.showTime}</Button>    
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
                <Col >
                    <Card inverse style = {{backgroundColor: 'rgba(23,162,184,0)'}} >
                    <CardTitle style={{fontSize: '40px'}}>{data.movie_description.name}</CardTitle>
                    <CardText >English | Animation | U/A </CardText>
                    </Card>
                </Col>
            </Row>
            <div>
            <Container style={{marginTop: '30px'}}>
                            <Col >
                            <Card>
                                <CardImg  src={data.movie_description.image} alt="Card image cap" />
                            </Card>
                            </Col>
            </Container>
                {
                    data.cinemas.map((showInfo) => {
                        return(
                        this.movieListing(showInfo));
                    })
                }
            </div>
            </div>) : (<div>
                <Row>
                    <Col s={4}>
                        <Preloader size='big'/>
                    </Col>
                    </Row>
            </div>)
    )
  }    
}
