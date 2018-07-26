import React, { Component } from 'react'

import {
    Button
} from 'reactstrap';

import './loader.css';
 class Seat extends Component {
     constructor(props){
         super(props);
        this.state = {
        isSelected: false,
        bookingStatus: this.props.bookingStatus,
        seatNo: this.props.seatNo
        }
        this.handleSeatSelection = this.handleSeatSelection.bind(this);
     }

     handleSeatSelection(){
        var seatSelected = this.state.isSelected;
        var seatNo = this.state.seatNo;
        if (!seatSelected){
          this.props.addSelectedSeat(seatNo);
        }
        else
        {
           this.props.removeSelectedSeat(seatNo);
        }
         this.setState({
             isSelected: !this.state.isSelected
         })
       
    }

    render() {
        const isSeatSelected = this.state.isSelected;
        const bookingStatus = this.state.bookingStatus;
        return (
            <div>
            {
                bookingStatus  ? (
                    isSeatSelected ? 
                        (<Button size="lg" color="primary"  onClick={this.handleSeatSelection} className='seat-left-margin'></Button>) 
                        :(
                            <Button  size = "lg" color="secondary"   onClick={this.handleSeatSelection} className='seat-left-margin'></Button>)
                ):(<Button size = "lg" color="danger" disabled className='seat-left-margin'></Button>)
            }
            </div>
        );
    } 
}

export default Seat;
