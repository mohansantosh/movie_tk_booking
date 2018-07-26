import React, { Component } from 'react'

import{
    Row,
    Button
} from 'react-materialize';

export default class Date extends Component {

  constructor(props){
      super(props)
      this.state = {
          dates: [
              {
                value: "Jan 24 Wed",
                status: false
              },
              {
                value: "Jan 25 Thu",
                status: false
              },
              {
                value: "Jan 26 Fri",
                status: false
              },
              {
                value: "Jan 27 Sat",
                status: false
              },
              {
                value: "Jan 28 Sun",
                status: true
              },
              {
                value: "Jan 29 Mon",
                status: true
              }
          ]
      }
  }
  render() {
      const {dates} = this.state
    return (
      <div>
                {
                    dates.map((date) => {
                                return <Button  waves='light'  disabled = {date.status} className='teal font-size button-date'>{date.value}</Button>
                    })
                }
      </div>
    )
  }
}
