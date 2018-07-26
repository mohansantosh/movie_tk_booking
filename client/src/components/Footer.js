import React, { Component } from 'react'

import {
    Footer
} from 'react-materialize';
import { Container } from 'reactstrap';


export default class Footrer extends Component {
  render() {
    return (
      <div>
        <Container width = '100%'>
        <Footer copyrights="&copy 2015 Copyright Text">
           
        </Footer>
        </Container>
      </div>
    )
  }
}
