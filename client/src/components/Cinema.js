import React,{Component} from 'react';
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

class Cinema extends Component{

    constructor (props) {
        super(props);
        this.showMovies = this.showMovies.bind(this);
    }

    render(){
        return(
            <Col sm={{ size: '6' }}>
            <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardBody style={{ backgroundColor: 'darkcyan' }}>
                <CardTitle>{this.props.name}</CardTitle>
                <CardSubtitle>{this.props.location}</CardSubtitle>
            </CardBody>
            <img width="100%" src={this.props.image} alt="Card image cap" />
            <CardBody>
                <CardText>{this.props.description}</CardText>
                <Button color="primary" size="sm">What is Showing</Button>{' '}
            </CardBody>
            </Card>
        </Col>
        );
    }
}

export default Cinema;