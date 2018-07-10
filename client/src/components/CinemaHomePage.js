import React, {Component} from 'react';
import '../background.jpeg';
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
            cinemas: []
        }
        axios.get('/api/cinemas').then(res => {
                this.state.cinemas = res.data;
            });
            console.log(this.state.cinemas);
    }
    render(){
    return(
        <div background="./background.img">
        <Container>
            <Row>
                <Col sm={{ size: '6' }}>
                    <div>{this.state.cinemas}</div>
                    <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardBody style={{ backgroundColor: 'darkcyan' }}>
                        <CardTitle>Escape Cinemas</CardTitle>
                        <CardSubtitle>Royapetta,Chennai</CardSubtitle>
                    </CardBody>
                    <img width="100%" src="https://media-cdn.tripadvisor.com/media/photo-s/06/ce/01/64/escape-cinemas.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardText>A Superior Sensory and Social cinematic experience, Escape offers seamless service and a wealth of amenities. Escape is a culmination of style, innovation and passion and redefines the cinema experience by presenting entertainment in a setting like never before.</CardText>
                        <Button color="primary" size="sm" >What is Showing</Button>{' '}
                    </CardBody>
                    </Card>
                </Col>
                <Col sm={{ size: '6' }}>
                    <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardBody style={{ backgroundColor: 'darkcyan' }}>
                        <CardTitle>Escape Cinemas</CardTitle>
                        <CardSubtitle>Royapetta,Chennai</CardSubtitle>
                    </CardBody>
                    <img width="100%" src="https://media-cdn.tripadvisor.com/media/photo-s/06/ce/01/64/escape-cinemas.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardText>A Superior Sensory and Social cinematic experience, Escape offers seamless service and a wealth of amenities. Escape is a culmination of style, innovation and passion and redefines the cinema experience by presenting entertainment in a setting like never before.</CardText>
                        <Button color="primary" size="sm" >What is Showing</Button>{' '}
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container>   
            <Row>
                <Col sm={{ size: '6' }}>
                    <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardBody style={{ backgroundColor: 'darkcyan' }}>
                        <CardTitle>Escape Cinemas</CardTitle>
                        <CardSubtitle>Royapetta,Chennai</CardSubtitle>
                    </CardBody>
                    <img width="100%" src="https://media-cdn.tripadvisor.com/media/photo-s/06/ce/01/64/escape-cinemas.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardText>A Superior Sensory and Social cinematic experience, Escape offers seamless service and a wealth of amenities. Escape is a culmination of style, innovation and passion and redefines the cinema experience by presenting entertainment in a setting like never before.</CardText>
                        <Button color="primary" size="sm" >What is Showing</Button>{' '}
                    </CardBody>
                    </Card>
                </Col>
                <Col sm={{ size: '6' }}>
                    <Card inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardBody style={{ backgroundColor: 'darkcyan' }}>
                        <CardTitle>Escape Cinemas</CardTitle>
                        <CardSubtitle>Royapetta,Chennai</CardSubtitle>
                    </CardBody>
                    <img width="100%" src="https://media-cdn.tripadvisor.com/media/photo-s/06/ce/01/64/escape-cinemas.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardText>A Superior Sensory and Social cinematic experience, Escape offers seamless service and a wealth of amenities. Escape is a culmination of style, innovation and passion and redefines the cinema experience by presenting entertainment in a setting like never before.</CardText>
                        <Button color="primary" size="sm" >What is Showing</Button>{' '}
                    </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
      </div>
    );
}
}

export default CinemaHomePage;