import React, { Component } from 'react'
import ScreenLayout from './ScreenLayout';
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

class Booking extends Component {

  constructor(props){
    super(props);
    this.state = {
        movieId: this.props.movieId,
        cinemaId: this.props.movieId,
        selectedSeats: [],
        showId: this.props.showId,
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

  render() {
      const cinemaName = "Palazzo";
      const movieName = "Jurassic World";
      const rating = "U/A";
      const showTime = "9:30pm"
      const selectedSeats = this.state.selectedSeats.toString();
      const totalPrice = this.state.totalPrice;
    return (
      <div>
        <Container style={{maxWidth: '1091px'}}>
          <Row>
            <Col sm={{ size: 6 }}>
                <Card inverse style = {{backgroundColor: 'rgba(23,162,184,0)'}} className="text-left">
                    <CardBody>
                        <CardTitle style = {{fontSize: '2.25rem'}}>{movieName.concat("  ").concat(rating)}</CardTitle>
                        <CardSubtitle>Cinema: {cinemaName}   |    Time: {showTime}</CardSubtitle>
                    </CardBody>
                </Card>
             </Col>
             <Col sm={{ size: 4 }}>
                <Card inverse style = {{backgroundColor: 'rgba(23,162,184,0)'}} className="text-left">
                        <CardBody>
                            <CardTitle style = {{fontSize: '2.25rem'}}> Total: {totalPrice}</CardTitle>
                            <CardSubtitle> Seats: {selectedSeats}</CardSubtitle>
                        </CardBody>
                        
                </Card>
            </Col>
            <Col sm={{ size: 2 }}>
                <Container style={{paddingTop: '20px'}}>
                {
                    totalPrice > 0 ? (<Button  size="lg" color="success" className='btn-xs'  onClick={this.handleSeatSelection}>Confirm Booking</Button>)
                    : (<Button size = "lg" color="danger" disabled> Confirm Booking</Button>)
                }
                </Container>
            </Col>
        </Row>
        </Container>
         <ScreenLayout addSelectedSeat={this.addSelectedSeat} removeSelectedSeat={this.removeSelectedSeat} />
      </div>
    )
  }
}

export default Booking;
