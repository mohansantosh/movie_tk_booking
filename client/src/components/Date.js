import React, { Component } from 'react'

import {
    Button
} from 'react-materialize';

export default class Date extends Component {
    constructor(props){
        super(props);
        this.state = {
            date : this.props.date
        }
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    handleDateSelect(){
        this.props.handleDateChange(this.state.date.date)
    }
  render() {
        const {date} = this.state 
        const disabled = date.disabled
        const formatted_date = date.day + ' ' + date.month + ' ' + date.weekday; 
        var color = "blue" + " font-size button-date";
        console.log(formatted_date);
        if(date.selected === true){
            color = "green" + " font-size button-date";
        }
        return (
            <Button onClick={this.handleDateSelect}  className='red' disabled = {disabled} className= {color}>{formatted_date}</Button>
        )
  }
}
