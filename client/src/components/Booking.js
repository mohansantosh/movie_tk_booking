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
    Col
} from 'reactstrap';

import {
    Preloader,
    Button
} from 'react-materialize';
import './loader.css';
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
                            <CardSubtitle>Cinema: {data.cinema.name}   |    Time: {data.formatted_date}</CardSubtitle>
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

                    this.state.totalPrice > 0 ? (<Link to = {{pathname: '/confirmbooking' ,state: { showData: {data}, selectedSeats: `${this.state.selectedSeats}`,amount: `${this.state.totalPrice}`}}}> <Button  size="lg" color="success" className='green font-size'>Confirm Booking</Button></Link>)
                        : (<Button size = "lg" color="danger" disabled className ='font-size' > Confirm Booking</Button>)
                    }
                    </Container>
                </Col>
            </Row>
            </Container>
            <ScreenLayout showId ={this.state.showId} addSelectedSeat={this.addSelectedSeat} removeSelectedSeat={this.removeSelectedSeat} /></div>)
            : ( 
                <div>
                    <Col s={4}>
                        <Preloader className = 'top' size='big'/>
                    </Col>
                </div>) 
    )
  }
}

export default Booking;
