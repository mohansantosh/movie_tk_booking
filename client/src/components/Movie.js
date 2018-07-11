
import React, { Component } from 'react';
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
  render() {
    return (
         <Col sm={{ size: '2' }}>
            <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
              <CardBody style={{ backgroundColor: '#00588B' }} height={{height:'64px'}}>
                  <CardTitle>{this.props.name}</CardTitle>
                  <CardSubtitle>{this.props.genre}</CardSubtitle>
              </CardBody>
              <img width="100%" src={this.props.image} alt="Card image cap" />
              <CardBody>
                  <Button color="primary" size="sm" >In Cinemas</Button>{' '}
              </CardBody>
          </Card>
        </Col>
    )
  }
}

export default Movie;
