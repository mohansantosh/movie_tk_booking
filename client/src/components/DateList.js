import React, { Component } from 'react'

import{
    Row,
    Button
} from 'react-materialize';

import Date from './Date';
export default class DateLis extends Component {

  constructor(props){
      super(props)
      console.log(this.props);
      this.state = {
          dates: this.props.dates
      }
  }

  render() {
      const {dates} = this.state
    return (
      <div>
                {
                    dates.map((date) => {
                                
                                return (<Date date = {date} handleDateChange={this.props.handleDateChange}/>)    
                    })
                }
      </div>
    )
  }
}
