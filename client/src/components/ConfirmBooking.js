import React from 'react';
import { Collapsible,CollapsibleItem,Card,CardTitle,Input,Preloader } from 'react-materialize';

import Container from 'react-materialize/lib/Container';

import {Redirect} from 'react-router-dom';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import axios from 'axios';

import './loader.css';

export default class ConfirmBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showId: this.props.location.state.showData.data._id,
      selectedSeats: this.props.location.state.selectedSeats,
      totalAmount: this.props.location.state.amount,
      cinema: this.props.location.state.showData.data.cinema,
      movie: this.props.location.state.showData.data.movie,
      showTime: this.props.location.state.showData.data.showTime,
      submitted: false,
      email:null,
      mobile: null,
      username: null,
      isTicketBookingSuccess: false,
      ticketId: null,
      submitTicket: null
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.mobileChange = this.mobileChange.bind(this);
    this.submitTicket = this.submitTicket.bind(this);
  }
  
  submitTicket(){
    this.setState({
      submitTicket: true
    });
    axios.post('/api/tickets/submit',{
      ticketId: this.state.ticketId,
      username: this.state.username,
      mobile: this.state.mobile,
      email: this.state.email
    }).then((response) => {
      console.log(response.data);
      this.setState({isTicketBookingSuccess: true, successTicketData: response.data,submitted: false})
    })
  }

  emailChange(event,value){
    console.log(value);
    this.setState({email: value})
  }
  mobileChange(event,value){
    this.setState({mobile: value})
  }
  usernameChange(event,value){
    this.setState({username: value})
  }
  componentDidMount(){
    var selectedSeats = this.state.selectedSeats;
    selectedSeats = selectedSeats.split(',')
    const showId = this.state.showId;
    axios.post('/api/tickets/createticket',{
        tickets: selectedSeats,
        showId: showId,
    }).
    then((response) => {
        console.log(response);
        this.setState({submitted: true,ticketId: response.data._id })
    })
  }


  render() {
    const {submitted} = this.state;
    const {successTicketData} = this.state;
    return (
    submitted === true ? (
    <Container>
      {
        this.state.submitTicket === true ? (<div id = 'overlay'><Preloader className='top' size='big'/></div>) : <div></div>
      }
        <Row>
        <Col sm={8}>
                <Card className='small'
                    header={<CardTitle image={this.state.movie.image}>{this.state.movie.name}</CardTitle>} className='card-color card-padding' >
                          <h5 align = 'left' className='font-size'><strong>Cinema:</strong> {this.state.cinema.name}</h5>
                          <h5 align = 'left' className='font-size'><strong>Date:</strong> {this.state.showTime} | <strong>Tickets:</strong> {this.state.selectedSeats} | <strong>Total:</strong> {this.state.totalAmount}</h5>
                </Card>
            </Col>
         <Col>
          <Input label="Coupon Code" validate  />
          <Button color = 'green'>Apply</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Card className='card-color'>
            <h6 className='font-size' align = 'left'><strong>Please fill your details</strong></h6>
            <Input s={6} onChange = {this.nameChange} label="First Name" />
            <Input s={6} onChange = {this.mobileChange} label="Mobile Number" />
            <Input onChange = {this.emailChange} type="email" label="Email" s={6} />
            </Card>
          </Container>
        </Col>
        <Col sm = {6}>
        <Card className='card-color'>
          <h6 className='font-size' align = 'left'><strong>Choose Payment</strong></h6>
          <Collapsible className='card-color' >
            <CollapsibleItem header='Amazon - 10% Flat Off' icon='payment' className='collapsable-header font-size'>
              <p>Total Amount Payable: {this.state.totalAmount} <Button onClick={this.submitTicket} color = 'green'>Pay Now</Button></p>
            </CollapsibleItem>
            <CollapsibleItem header='Paytm - 30% Cashback' icon='account_balance_wallet' className='collapsable-header font-size'>
              <p>Total Amount Payable: {this.state.totalAmount} <Button onClick={this.submitTicket} color = 'green'>Pay Now</Button></p>
            </CollapsibleItem>
            <CollapsibleItem header='Payu - 30% SuperCash' icon='payment' className='collapsable-header font-size'>
              <p>Total Amount Payable: {this.state.totalAmount} <Button onClick={this.submitTicket} color = 'green'>Pay Now</Button></p>
            </CollapsibleItem>
          </Collapsible>
          </Card>
        </Col>
      </Row>
      </Container>
    ) : 
    (this.state.isTicketBookingSuccess === true) ? (
      <div>
       <Redirect to={{pathname: "/success", state: { ticketInfo: {successTicketData} }}}/>
      </div>
    ) :
      <div>
              
                        <Preloader className = 'top' size='big'/>
            </div>
    );
  }
}
