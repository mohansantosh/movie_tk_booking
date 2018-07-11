import React, { Component } from 'react'

import {
    Button
} from 'reactstrap';

 class Seat extends Component {
     constructor(props){
         super(props);
        this.state = {
        isSelected: false,
        bookingStatus: this.props.bookingStatus,
        seatNo: null
        }
        this.handleSeatSelection = this.handleSeatSelection.bind(this);
     }

     handleSeatSelection(){
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
                bookingStatus ? (
                    isSeatSelected ? 
                        (<Button color="primary"  onClick={this.handleSeatSelection}>{this.props.seatNo}</Button>) 
                        :(
                            <Button color="secondary"  onClick={this.handleSeatSelection}>{this.props.seatNo}</Button>)
                ):(<Button color="danger">{this.props.seatNo}</Button>)
            }
            </div>
        );
    } 
}

export default Seat;
