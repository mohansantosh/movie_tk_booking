import React, { Component } from 'react'
import { Card, CardText, CardBody,
    CardTitle, Container } from 'reactstrap';

import {Icon} from 'react-materialize';
import './loader.css'
export default class Success extends Component {
    constructor(props){
        super(props);
        this.state = {
            successTicket: this.props.location.state.ticketInfo.successTicketData
        }
    }
  render() {
      const {successTicket} = this.state;

    return (
        <div>
         <Container>
            <Card className = 'card-color'>
            <CardBody>
                
                <CardTitle><Icon small>check_circle</Icon>Ticket Booked Successfully Ticket Id: {successTicket._id}</CardTitle>
            </CardBody>
            <img  src={successTicket.show.movie.image} />
            <CardBody>
                <CardText><strong>Cinema:</strong>{successTicket.show.cinema.name} | <strong>Showtime:</strong> {successTicket.show.showTime} | <strong>Tickets</strong>: {successTicket.tickets.join() } | <strong>Email:</strong> {successTicket.email} | <strong>Mobile:</strong> {successTicket.mobile}</CardText>
            </CardBody>
            </Card>
        </Container>
      </div>
    )
  }
}
