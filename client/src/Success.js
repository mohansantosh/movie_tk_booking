import React, { Component } from 'react'
import {
    Card,
    CardTitle
}  from 'react-materialize';

export default class Success extends Component {
    constructor(props){
        super(props);
        console.log("entering success page");
        console.log(this.props);
        this.state = {
            successTicket: this.props.location.state.ticketInfo
        }
    }
  render() {
      const {successTicket} = this.state.successTicket;
      console.log(successTicket);
    return (
      <div>
       <Card className='small'
            header={<CardTitle image='https://img.spicinemas.in/resources/images/movies/jurassic-world-fallen-kingdom/1000x320.jpg'>{successTicket._id}</CardTitle>}
            actions={[<a href='#'>This is a Link</a>]}>
            {successTicket.movie.name}
        </Card> 
      </div>
    )
  }
}
