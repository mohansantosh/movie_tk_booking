
import React, { Component } from 'react';

import {Link} from 'react-router-dom';
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

import {Router,Route} from 'react-router';
import App from './AppNavbar'


class Movie extends Component {
    constructor(props){
        super(props)
        this.state = {
            movieId: this.props.movie._id
        }
    this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(){
        return(
        <Link to={`/listing/${this.state.movieId}`} />);
    }
  render() {
    console.log(this.props);
    return (

         <Col sm={{ size: '2' }}>
            <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
              <CardBody style={{ backgroundColor: '#00588B' }} height={{height:'64px'}}>
                  <CardSubtitle>{this.props.movie.name}</CardSubtitle>
              </CardBody>
              <Link to={`/listing/${this.state.movieId}`} activeClassName="active">
                 <img width="100%" src={this.props.movie.small_image} alt="Card image cap" />
               </Link>  
          </Card>
        </Col>
        
    )
  }
}

export default Movie;
