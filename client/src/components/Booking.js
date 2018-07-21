import React, { Component } from 'react'
import ScreenLayout from './ScreenLayout';
import {Link} from 'react-router-dom';
import axios from 'axios'
import { 
    Container,
    CardBody,
    Card,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    Button
} from 'reactstrap';

import {
    Preloader
} from 'react-materialize';
class Booking extends Component {

  constructor(props){
    super(props);
    this.state = {
        selectedSeats: [],
        showId: this.props.match.params.id,
        data: null,
        totalPrice: 0,
        ticketPrice: 200
    };
    this.addSelectedSeat = this.addSelectedSeat.bind(this);
    this.removeSelectedSeat = this.removeSelectedSeat.bind(this);
 }
    addSelectedSeat(seatNo){
        var seats = this.state.selectedSeats.length + 1
        var totalPrice = this.state.ticketPrice * seats; 
        this.setState({
            seatSelected: this.state.selectedSeats.push(seatNo),
            totalPrice: totalPrice
        });
    }
    removeSelectedSeat(seatNo){
        var seats = this.state.selectedSeats
        var index = seats.indexOf(seatNo);
        var totalPrice = this.state.ticketPrice * (seats.length - 1); 
        if (index !== -1){
            seats.splice(index, 1);
            this.setState({
                selectedSeats: seats,
                totalPrice: totalPrice
            });
        }
    }

    componentDidMount(){
        axios.get(`/api/shows/${this.state.showId}`)
            .then((response) => {
                console.log(response.data); 
                this.setState({data: response.data[0]})
            })
    }
  render() {
      const {data} = this.state
      const rating = "U/A";

    return (
        (data !== null)
         ? (
            <div>
            <Container style={{maxWidth: '1091px'}}>
            <Row>
                <Col sm={{ size: 6 }}>
                    <Card inverse style = {{backgroundColor: 'rgba(23,162,184,0)'}} className="text-left">
                        <CardBody>
                            <CardTitle style = {{fontSize: '2.25rem'}}>{data.movie.name.concat("  ").concat(rating)}</CardTitle>
                            <CardSubtitle>Cinema: {data.cinema.name}   |    Time: {data.showTime}</CardSubtitle>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={{ size: 4 }}>
                    <Card inverse style = {{backgroundColor: 'rgba(23,162,184,0)'}} className="text-left">
                            <CardBody>
                                <CardTitle style = {{fontSize: '2.25rem'}}> Total: {this.state.totalPrice}</CardTitle>
                                <CardSubtitle> Seats: {this.state.selectedSeats.toString()}</CardSubtitle>
                            </CardBody>
                            
                    </Card>
                </Col>
                <Col sm={{ size: 2 }}>
                    <Container style={{paddingTop: '20px'}}>
                    {

                    this.state.totalPrice > 0 ? (<Link to = {{pathname: '/confirmbooking' ,state: { showDetails: `${data}`}}}> <Button  size="lg" color="success" className='btn-xs'>Confirm Booking</Button></Link>)
                        : (<Button size = "lg" color="danger" disabled> Confirm Booking</Button>)
                    }
                    </Container>
                </Col>
            </Row>
            </Container>
            <ScreenLayout addSelectedSeat={this.addSelectedSeat} removeSelectedSeat={this.removeSelectedSeat} /></div>)
            : ( 
                <div>
                    <Col s={4}>
                        <Preloader size='big'/>
                    </Col>
                </div>) 
    )
  }
}

export default Booking;
