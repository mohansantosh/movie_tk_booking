import React, {Component} from 'react';
import '../background.jpeg';
import Cinema from './Cinema';
import Movie from './Movie';
import Seat from './Seat'
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
        const {movies} = this.state ;

    return(
        <div background="./background.img">
         <Card inverse style={{ backgroundColor: 'rgba(6,4,4,0)' }}>
        <Container style={{width: 'initial'}}>
                <Row >
                    {
                            [1,2,3,4,5].map((value) => {
                            return(
                                <Seat bookingStatus={true} isSelected={false} seatNo={value} />
                            );
                        })
                    }
                </Row>
                    
            <Row>
            {   
                    [1,2,3,4,5].map((value) => {
                    return(
                        <Seat bookingStatus={true} isSelected={false} seatNo={value} />
                    );
                })
            }
            </Row>
            <Row>
            {   
                    [1,2,3].map((value) => {
                    return(
                        <Seat bookingStatus={true} isSelected={false} seatNo={value} />
                    );
                })
            }
            </Row>
        </Container>
        </Card>
      </div>
    );
}
}

export default CinemaHomePage;