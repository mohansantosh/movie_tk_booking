import React, { Component } from 'react'

import {
    Card,
    CardTitle
} from 'react-materialize';
import './loader.css'
import { Container } from 'reactstrap';
export default class Error extends Component {
  render() {
    return (
      <div>
          <Container className = 'error-container' >
        <Card className='small'
                    header={<CardTitle image='https://i.imgur.com/AgjUj.jpg'><strong>Something Went Wrong!! Please try After Some Time</strong></CardTitle>} className='card-color card-padding' actions={[<a href="/">Go Home</a>]}>
        </Card>
        </Container>
      </div>
    )
  }
}
